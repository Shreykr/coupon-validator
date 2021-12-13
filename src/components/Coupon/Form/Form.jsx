import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import "./form.css";

import { couponService } from "../../../services/http/Coupon";

export const Forms = () => {
  const validate = (values) => {
    const errors = {};
    if (values.couponValue >= 5000) {
      errors.couponValue = "Value must be less than 5000";
    }
    if (
      values.couponType === "Percentage Discount" &&
      values.couponValue > 100
    ) {
      errors.couponValue = "Value must be less than 100";
    } else if (values.couponType === "Flat Discount") {
      values.maxDiscount = values.couponValue;
    }
    if (
      values.minCartValue < values.couponValue &&
      values.couponType === "Flat Discount" &&
      values.minCartValue !== ""
    ) {
      errors.minCartValue = "Value must be more than coupon value";
    }

    if (
      values.couponExpiryDate < values.couponStartDate &&
      values.couponExpiryDate !== ""
    ) {
      errors.couponExpiryDate = "Expiry date must be greater than state date";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        couponCode: "",
        couponValue: "",
        couponType: "",
        maxDiscount: "",
        minCartValue: "",
        couponStartDate: "",
        couponExpiryDate: "",
      }}
      validate={validate}
      validationSchema={Yup.object({
        couponCode: Yup.string()
          .required("Coupon Code is required")
          .min(6, "Must be at least 6 characters long")
          .max(12, "Must be at most 12 characters long"),
        couponValue: Yup.number()
          .required("Coupon Value is required")
          .min(1, "Must be greater than 0"),
        couponType: Yup.string()
          .oneOf(
            ["Flat Discount", "Percentage Discount"],
            "Invalid Coupon Type"
          )
          .required("Coupon Type is required"),
        maxDiscount: Yup.number().required("Max. Discount is required"),
        minCartValue: Yup.number()
          .required("Min. Cart Amount is required")
          .min(50, "Must be at least 50")
          .max(5000, "Must be at most 5000"),
        couponStartDate: Yup.date()
          .required("Coupon Start Date is required")
          .min(new Date(), "Start Date must be in future"),
        couponExpiryDate: Yup.date().required("Coupon Expiry Date is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        let data = {
          couponCode: values.couponCode,
          couponValue: values.couponValue,
          couponType: values.couponType,
          maxDiscountAmount: values.maxDiscount,
          minCartAmount: values.minCartValue,
          couponStartDate: new Date(values.couponStartDate).getTime(),
          couponExpiryDate: new Date(values.couponExpiryDate).getTime(),
        };
        couponService("add-coupon", undefined, data);
        setSubmitting(false);
      }}>
      {(formik) => (
        <div className='form-container'>
          <Form className='form-container__form'>
            <div className='form-header'>
              <h1>Create Coupon</h1>
            </div>
            <div className='form-container__form__group'>
              <label className='form-container__label' htmlFor='couponCode'>
                Coupon Code
              </label>
              <Field
                type='text'
                name='couponCode'
                placeholder='Enter Coupon Code'
                id='couponCode'
                className='form-container__input'
                onChange={formik.handleChange}
              />
              <div className='form__group--error'>
                <ErrorMessage name='couponCode' />
              </div>
            </div>
            <div className='form-container__form__group'>
              <div className='form-container__group__coupon-type'>
                <p className='form-container__label-p'>Coupon Type</p>
                <label>
                  <Field
                    type='radio'
                    name='couponType'
                    defaultValue='Flat Discount'
                    id='couponType'
                    className='form-container__input-radio'
                    checked={formik.values.couponType === "Flat Discount"}
                  />
                  <span className='form-container__radio-value'>
                    Flat Discount
                  </span>
                </label>
                <label>
                  <Field
                    type='radio'
                    name='couponType'
                    defaultValue='Percentage Discount'
                    className='form-container__input-radio'
                    style={{ marginBottom: "17.5px" }}
                    checked={formik.values.couponType === "Percentage Discount"}
                  />
                  <span className='form-container__radio-value'>
                    Percentage Discount
                  </span>
                </label>
              </div>
              <div className='form__group--error'>
                <ErrorMessage name='couponType' />
              </div>
            </div>
            <div className='form-container__form__group'>
              <label className='form-container__label' htmlFor='couponValue'>
                Coupon Value
              </label>
              <Field
                type='number'
                name='couponValue'
                placeholder='Enter Coupon Value'
                id='couponValue'
                className={
                  "form-container__input " +
                  (formik.values.couponType
                    ? "form__group--enabled"
                    : "form__group--disabled")
                }
                disabled={formik.values.couponType === ""}
              />
              <div className='form__group--error'>
                <ErrorMessage name='couponValue' />
              </div>
            </div>
            <div className='form-container__form__group'>
              <label
                className='form-container__label'
                htmlFor='max-discount-amount'>
                Maximum Discount Amount
              </label>
              <Field
                type='number'
                name='maxDiscount'
                id='max-discount-amount'
                placeholder='Enter Max. Discount Amount'
                className={
                  "form-container__input " +
                  (formik.values.couponType &&
                  formik.values.couponType === "Percentage Discount" &&
                  !formik.errors.couponValue
                    ? "form__group--enabled"
                    : "form__group--disabled")
                }
                disabled={
                  formik.values.couponType === "" ||
                  formik.values.couponType === "Flat Discount"
                }
              />
              <div className='form__group--error'>
                <ErrorMessage name='maxDiscount' />
              </div>
            </div>
            <div className='form-container__form__group'>
              <label className='form-container__label' htmlFor='minCartValue'>
                Minimum Cart Amount
              </label>
              <Field
                type='number'
                name='minCartValue'
                id='minCartValue'
                placeholder='Enter Min. Cart Amount'
                className={
                  "form-container__input " +
                  (formik.values.couponType && !formik.errors.couponValue
                    ? "form__group--enabled"
                    : "form__group--disabled")
                }
                disabled={
                  formik.values.couponType === "" || formik.errors.couponValue
                }
              />
              <div className='form__group--error'>
                <ErrorMessage name='minCartValue' />
              </div>
            </div>
            <div className='form-container__form__group'>
              <label
                className='form-container__label'
                htmlFor='couponStartDate'>
                Start Date
              </label>
              <Field
                type='datetime-local'
                name='couponStartDate'
                id='couponStartDate'
                className='form-container__input'
              />
              <div className='form__group--error'>
                <ErrorMessage name='couponStartDate' />
              </div>
            </div>
            <div className='form-container__form__group'>
              <label
                className='form-container__label'
                htmlFor='couponExpiryDate'>
                Expiry Date
              </label>
              <Field
                type='datetime-local'
                name='couponExpiryDate'
                id='couponExpiryDate'
                className={
                  "form-container__input " +
                  (formik.values.couponStartDate === "" ||
                  formik.errors.couponStartDate !== undefined
                    ? "form__group--disabled"
                    : "form__group--enabled")
                }
                disabled={
                  formik.values.couponStartDate === "" ||
                  formik.errors.couponStartDate !== undefined
                }
              />
              <div className='form__group--error'>
                <ErrorMessage name='couponExpiryDate' />
              </div>
            </div>
            <button
              title='Create Button'
              type='submit'
              className='form-container__button'
              disabled={
                !formik.isValid || !formik.dirty || formik.isSubmitting
              }>
              Create
            </button>
            <Link
              to='../checkout'
              className='form-container__button'
              style={{ textDecoration: "none", color: "black" }}>
              <div>Go Back</div>
            </Link>
          </Form>
        </div>
      )}
    </Formik>
  );
};
