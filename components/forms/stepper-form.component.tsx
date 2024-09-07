import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepButton,
  Alert,
} from "@mui/material";
import DeliveryForm from "./delivery-form/delivery-form.component";
import PaymentForm from "./payment-form/payment-form.component";
import { IAddress, ICard, ICheckout, ICustomer } from "types/ICheckout.type";
import CustomerDataForm from "./customer-form/customer-data-form.component";
import { postCheckout } from "dh-marvel/services/checkout/checkout.service";
import { IComic } from "types/IComic.type";
import catchError from "./handle-checkout-errors";
import { useRouter } from "next/router";

const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];

type StepperForm = {
  comic?: IComic;
};

const StepperForm: FC<StepperForm> = ({ comic }) => {
  const defaultValue = {
    customer: {
      name: "",
      lastname: "",
      email: "",
      address: {
        address1: "",
        address2: null,
        city: "",
        state: "",
        zipCode: "",
      },
    },
    card: {
      number: "",
      cvc: "",
      expDate: "",
      nameOnCard: "",
    },
    order: {
      name: "",
      image: "",
      price: 0,
    },
  };
  
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [checkoutData, setCheckoutData] = useState<ICheckout>(defaultValue);
  const [error, setError] = useState<string>("");

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  // Esto asegura que el useEffect no cause un bucle infinito al actualizar checkoutData
  useEffect(() => {
    if (comic) {
      setCheckoutData(prevState => ({
        ...prevState,
        order: {
          name: comic.title,
          image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
          price: comic.price,
        },
      }));
    }
  }, [comic]);

  const handleSubmitCustomerForm = (data: ICustomer) => {
    setCheckoutData(prevState => ({
      ...prevState,
      customer: { ...data },
    }));
    setActiveStep(prev => prev + 1);
  };

  const handleSubmitAddressForm = (data: IAddress) => {
    setCheckoutData(prevState => ({
      ...prevState,
      customer: {
        ...prevState.customer,
        address: { ...data },
      },
    }));
    setActiveStep(prev => prev + 1);
  };

  const handleSubmitPaymentForm = (data: ICard) => {
    const updatedCheckoutData = {
      ...checkoutData,
      card: {
        ...data,
      },
    };
    const response = postCheckout(updatedCheckoutData);

    response.then((res) => {
      if (!res.data) {
        const error = catchError(res);
        setError(error);
        return;
      } else {
        const customer = res.data.customer;
        const order = res.data.order;

        localStorage.setItem(
          "checkoutData",
          JSON.stringify({
            customer,
            order,
          })
        );
        router.push({
          pathname: "/success",
        });
      }
    });
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{ paddingBottom: "50px" }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box>
        <Typography
          sx={{ paddingBottom: "30px" }}
          variant="h5"
        >
          Paso {activeStep + 1}
        </Typography>
        {activeStep === 0 && (
          <CustomerDataForm
            data={checkoutData.customer}
            activeStep={activeStep}
            handleNext={handleSubmitCustomerForm}
          />
        )}
        {activeStep === 1 && (
          <DeliveryForm
            data={checkoutData.customer.address}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleSubmitAddressForm}
          />
        )}
        {activeStep === 2 && (
          <PaymentForm
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleSubmitPaymentForm}
          />
        )}
      </Box>
      {error !== "" && (
        <Alert
          severity="error"
          sx={{ marginTop: "30px" }}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default StepperForm;