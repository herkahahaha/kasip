import React, { useEffect, useState } from "react";
import {
  Button,
  Tab,
  Tabs,
  TextField,
  InputAdornment,
  Icon,
  Typography
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import {
  FuseAnimate,
  FusePageCarded,
  FuseChipSelect,
  FuseUtils,
  FuseLoading
} from "@fuse";
import { useForm } from "@fuse/hooks";
import { Link } from "react-router-dom";
import clsx from "clsx";
import _ from "@lodash";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";

const useStyles = makeStyles(theme => ({
  productImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0
  },
  productImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut
  },
  productImageItem: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& $productImageFeaturedStar": {
        opacity: 0.8
      }
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& $productImageFeaturedStar": {
        opacity: 1
      },
      "&:hover $productImageFeaturedStar": {
        opacity: 1
      }
    }
  }
}));

function Product(props) {
  const dispatch = useDispatch();
  const product = useSelector(({ vesselApp }) => vesselApp.product);

  const classes = useStyles(props);
  const [tabValue, setTabValue] = useState(0);
  const { form, handleChange, setForm } = useForm(null);

  useEffect(() => {
    function updateProductState() {
      const params = props.match.params;
      const { productId } = params;

      if (productId === "new") {
        dispatch(Actions.newProduct());
      } else {
        dispatch(Actions.getProduct(props.match.params));
      }
    }

    updateProductState();
  }, [dispatch, props.match.params]);

  useEffect(() => {
    if (
      (product.data && !form) ||
      (product.data && form && product.data.id !== form.id)
    ) {
      setForm(product.data);
    }
  }, [form, product.data, setForm]);

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  function handleChipChange(value, name) {
    setForm(
      _.set(
        { ...form },
        name,
        value.map(item => item.value)
      )
    );
  }

  function setFeaturedImage(id) {
    setForm(_.set({ ...form }, "featuredImageId", id));
  }

  function handleUploadChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      setForm(
        _.set({ ...form }, `images`, [
          {
            id: FuseUtils.generateGUID(),
            url: `data:${file.type};base64,${btoa(reader.result)}`,
            type: "image"
          },
          ...form.images
        ])
      );
    };

    reader.onerror = function() {
      console.log("error on load image");
    };
  }

  function canBeSubmitted() {
    return form.name.length > 0 && !_.isEqual(product.data, form);
  }

  if (
    (!product.data ||
      (product.data && props.match.params.productId !== product.data.id)) &&
    props.match.params.productId !== "new"
  ) {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
      }}
      header={
        form && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/vessel/products"
                  color="inherit"
                >
                  <Icon className="mr-4 text-20">arrow_back</Icon>
                  Products
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  {form.images.length > 0 && form.featuredImageId ? (
                    <img
                      className="w-32 sm:w-48 mr-8 sm:mr-16 rounded"
                      src={
                        _.find(form.images, { id: form.featuredImageId }).url
                      }
                      alt={form.name}
                    />
                  ) : (
                    <img
                      className="w-32 sm:w-48 mr-8 sm:mr-16 rounded"
                      src="assets/images/ecommerce/product-image-placeholder.png"
                      alt={form.name}
                    />
                  )}
                </FuseAnimate>
                <div className="flex flex-col min-w-0">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.name ? form.name : "New Product"}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">Product Detail</Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                className="whitespace-no-wrap"
                variant="contained"
                disabled={!canBeSubmitted()}
                onClick={() => dispatch(Actions.saveProduct(form))}
              >
                Save
              </Button>
            </FuseAnimate>
          </div>
        )
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-full h-64" }}
        >
          <Tab className="h-64 normal-case" label="Basic Info" />
          <Tab className="h-64 normal-case" label="Specification" />
          <Tab className="h-64 normal-case" label="Images" />
        </Tabs>
      }
      content={
        form && (
          <div className="p-16 sm:p-24 max-w-2xl">
            {tabValue === 0 && (
              <div>
                {/* Basic Information */}
                <TextField
                  className="mt-8 mb-16"
                  error={form.name === ""}
                  required
                  label="Vessel Name"
                  autoFocus
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <FuseChipSelect
                  className="mt-8 mb-24"
                  required
                  value={form.categories.map(item => ({
                    value: item,
                    label: item
                  }))}
                  onChange={value => handleChipChange(value, "vessel-type")}
                  placeholder="Select multiple vessel type"
                  textFieldProps={{
                    label: "Vessel Type",
                    InputLabelProps: {
                      shrink: true
                    },
                    variant: "outlined"
                  }}
                  isMulti
                />

                <TextField
                  className="mt-8 mb-16"
                  error={form.construction === ""}
                  required
                  label="Construction"
                  autoFocus
                  id="construction"
                  name="construction"
                  value={form.construction}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                {/* <TextField
                  className="mt-8 mb-16"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  label="Description"
                  type="text"
                  value={form.description}
                  multiline
                  rows={5}
                  variant="outlined"
                  fullWidth
                /> */}

                <FuseChipSelect
                  className="mt-8 mb-24"
                  required
                  value={form.categories.map(item => ({
                    value: item,
                    label: item
                  }))}
                  onChange={value => handleChipChange(value, "categories")}
                  placeholder="Select multiple categories"
                  textFieldProps={{
                    label: "Categories",
                    InputLabelProps: {
                      shrink: true
                    },
                    variant: "outlined"
                  }}
                  isMulti
                />

                <FuseChipSelect
                  className="mt-8 mb-16"
                  required
                  value={form.tags.map(item => ({
                    value: item,
                    label: item
                  }))}
                  onChange={value => handleChipChange(value, "flags")}
                  placeholder="Select flag"
                  textFieldProps={{
                    label: "Flag",
                    InputLabelProps: {
                      shrink: true
                    },
                    variant: "outlined"
                  }}
                  isMulti
                />

                <TextField
                  className="mt-8 mb-16"
                  error={form.owner === ""}
                  required
                  label="Owner"
                  autoFocus
                  id="owner"
                  name="owner"
                  value={form.owner}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  error={form.yearOfBuilt === ""}
                  required
                  label="Year of Built"
                  autoFocus
                  type="date"
                  id="date"
                  name="year-of-built"
                  value={form.yearOfBuilt}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  error={form.designBy === ""}
                  required
                  label="Design By"
                  autoFocus
                  id="design-by"
                  name="design"
                  value={form.designBy}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  error={form.launching === ""}
                  required
                  label="Launching"
                  autoFocus
                  type="date"
                  id="date-launching"
                  name="launching"
                  value={form.launching}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                />

                <FuseChipSelect
                  className="mt-8 mb-24"
                  required
                  value={form.categories.map(item => ({
                    value: item,
                    label: item
                  }))}
                  onChange={value =>
                    handleChipChange(value, "port-of-register")
                  }
                  placeholder="Port of Register"
                  textFieldProps={{
                    label: "Port of Register",
                    InputLabelProps: {
                      shrink: true
                    },
                    variant: "outlined"
                  }}
                  isMulti
                />
              </div>
            )}
            {tabValue === 1 && (
              <div>
                <TextField
                  className="mt-8 mb-16"
                  label="Classification"
                  required
                  id="classification"
                  name="classification"
                  value={form.classification}
                  onChange={handleChange}
                  variant="outlined"
                  autoFocus
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  required
                  label="Dimension Size"
                  autoFocus
                  id="dimension-size"
                  name="dimension-size"
                  value={form.dimensionSize}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Feet</InputAdornment>
                    )
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  required
                  label="Breadth"
                  autoFocus
                  id="breadth"
                  name="breadth"
                  value={form.breadth}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Meter</InputAdornment>
                    )
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  required
                  label="Depth"
                  autoFocus
                  id="depth"
                  name="depth"
                  value={form.depth}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Meter</InputAdornment>
                    )
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  required
                  label="Gross Tonnage"
                  autoFocus
                  id="gross-tonnage"
                  name="gross-tonnage"
                  value={form.grossTonnage}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Ton</InputAdornment>
                    )
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  required
                  label="Net Tonnage"
                  autoFocus
                  id="net-tonnage"
                  name="net-tonnage"
                  value={form.netTonnage}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Ton</InputAdornment>
                    )
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  required
                  label="Deadweight"
                  autoFocus
                  id="deadweight"
                  name="deadweight"
                  value={form.deadweight}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Ton</InputAdornment>
                    )
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  required
                  label="Capacity Cargo"
                  autoFocus
                  id="capacity-cargo"
                  name="capacity-cargo"
                  value={form.capacityCargo}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        Metric Ton
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  fullWidth
                />
              </div>
            )}
            {tabValue === 2 && (
              <div>
                <input
                  accept="image/*"
                  className="hidden"
                  id="button-file"
                  type="file"
                  onChange={handleUploadChange}
                />
                <div className="flex justify-center sm:justify-start flex-wrap">
                  <label
                    htmlFor="button-file"
                    className={clsx(
                      classes.productImageUpload,
                      "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                    )}
                  >
                    <Icon fontSize="large" color="action">
                      cloud_upload
                    </Icon>
                  </label>
                  {form.images.map(media => (
                    <div
                      onClick={() => setFeaturedImage(media.id)}
                      className={clsx(
                        classes.productImageItem,
                        "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                        media.id === form.featuredImageId && "featured"
                      )}
                      key={media.id}
                    >
                      <Icon className={classes.productImageFeaturedStar}>
                        star
                      </Icon>
                      <img
                        className="max-w-none w-auto h-full"
                        src={media.url}
                        alt="product"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer("vesselApp", reducer)(Product);
