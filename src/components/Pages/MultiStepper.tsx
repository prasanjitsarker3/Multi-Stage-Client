"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import {
  ArrowLeft,
  ArrowRight,
  BaggageClaim,
  ContactRound,
  Cross,
  SendHorizontal,
} from "lucide-react";
import { postCreating } from "../Server/postSend";
import { toast } from "sonner";
import { motion } from "framer-motion";

type FormValues = {
  fullName: string;
  dob: string;
  nationality: string;
  email: string;
  phone: string;
  departureDate: string;
  returnDate: string;
  accommodation: string;
  specialRequests: string;
  healthDeclaration: string;
  emergencyContact: string;
  medicalConditions: string;
};

const MultiStepper = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      dob: "",
      nationality: "",
      email: "",
      phone: "",
      departureDate: "",
      returnDate: "",
      accommodation: "",
      specialRequests: "",
      healthDeclaration: "",
      emergencyContact: "",
      medicalConditions: "",
    },
  });

  const {
    watch,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = methods;

  // Data Submit Function Implement
  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Processing");
    try {
      const res = await postCreating(data);
      if (res?.success === true) {
        reset();
        setStep(1);
        toast.success(res?.message, { id: toastId, duration: 2000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 2000 });
      }
    } catch (err: any) {
      console.log(err?.message);
      toast.loading(err?.message || "Something went wrong!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  // Changing Function Implement
  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const watchFields = watch();

  const isStep1Complete =
    watchFields.fullName &&
    watchFields.dob &&
    watchFields.nationality &&
    watchFields.email &&
    watchFields.phone;

  const isStep2Complete =
    watchFields.departureDate &&
    watchFields.returnDate &&
    watchFields.accommodation;

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-8">
        <h1 className=" text-2xl py-3 text-[#003249] font-semibold">
          Multi-Stage Mars
        </h1>
        {/* Stepper Button Implement */}
        <div className=" relative flex justify-between items-center mb-5">
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 h-0.5 z-0">
            <motion.div
              className={`absolute left-0 h-full w-1/3 border-2 ${
                step === 2 || step === 3 ? "border-blue-500" : "border-gray-600"
              }`}
              transition={{ duration: 0.5 }}
            ></motion.div>

            <motion.div
              className={`absolute left-1/3 h-full w-1/6 border-2 ${
                step === 2 || step === 3 ? "border-blue-500" : "border-gray-600"
              }`}
              transition={{ duration: 0.5 }}
            ></motion.div>
            <motion.div
              className={`absolute right-1/3 h-full w-1/6 border-2 ${
                step === 3 ? "border-blue-500" : "border-gray-600"
              }`}
              transition={{ duration: 0.5 }}
            ></motion.div>
            <motion.div
              className={`absolute right-0 h-full w-1/3 border-2 ${
                step === 3 ? "border-blue-500" : "border-gray-600"
              }`}
            ></motion.div>
          </div>

          <button
            className={` z-20 py-2 px-4 h-14 w-14 flex justify-center items-center rounded-full ${
              step === 1 || step === 2 || step === 3
                ? "bg-blue-500 text-white"
                : " bg-gray-200 text-slate-800"
            }`}
            onClick={() => setStep(1)}
          >
            <ContactRound size={30} />
          </button>
          <button
            className={` z-20 py-2 px-4 h-14 w-14 flex justify-center items-center rounded-full ${
              step >= 2
                ? "bg-blue-500 text-white"
                : " bg-gray-200 text-slate-800"
            }`}
            disabled={!isStep1Complete}
            onClick={() => setStep(2)}
          >
            <BaggageClaim size={30} />
          </button>
          <button
            className={` z-20 py-2 px-4 h-14 w-14 flex justify-center items-center  rounded-full ${
              step >= 3
                ? "bg-blue-500 text-white"
                : " bg-gray-200 text-slate-800"
            }`}
            disabled={!isStep2Complete}
            onClick={() => setStep(3)}
          >
            <Cross size={25} />
          </button>
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Personal Information Section Implement  */}
          {step === 1 && (
            <div>
              <h1 className=" text-[#003249] md:text-3xl text-2xl font-semibold py-3">
                Personal Information:
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-gray-50 p-8 rounded">
                <div className=" space-y-1">
                  <label htmlFor="Full Name">
                    Name <span className=" text-red-400">*</span>
                  </label>
                  <Input
                    {...methods.register("fullName", {
                      required: "Full Name is required",
                    })}
                    placeholder="Enter..."
                  />
                  {errors.fullName && (
                    <p className="text-red-500">{errors.fullName.message}</p>
                  )}
                </div>
                <div className=" space-y-1">
                  <label htmlFor="Date of Birth">
                    Date of Birth <span className=" text-red-400">*</span>
                  </label>
                  <Input
                    {...methods.register("dob", {
                      required: "Date of Birth is required",
                    })}
                    placeholder="Enter..."
                    type="date"
                  />
                  {errors.dob && (
                    <p className="text-red-500">{errors.dob.message}</p>
                  )}
                </div>
                <div className=" space-y-1">
                  <label htmlFor="Nationality">
                    Nationality <span className=" text-red-400">*</span>
                  </label>
                  <Input
                    {...methods.register("nationality", {
                      required: "Nationality is required",
                    })}
                    placeholder="Enter..."
                  />
                  {errors.nationality && (
                    <p className="text-red-500">{errors.nationality.message}</p>
                  )}
                </div>
                <div className=" space-y-1">
                  <label htmlFor="Email">
                    Email <span className=" text-red-400">*</span>
                  </label>
                  <Input
                    {...methods.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter..."
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className=" space-y-1">
                  <label htmlFor="Phone">
                    Phone <span className=" text-red-400">*</span>
                  </label>
                  <Input
                    {...methods.register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    placeholder="Enter..."
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* ravel Preferences Section Implement  */}
          {step === 2 && (
            <div>
              <h1 className=" text-[#003249] md:text-3xl text-2xl font-semibold py-3">
                Travel Preferences
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50 p-8 rounded">
                <div className=" space-y-1">
                  <label htmlFor="Departure Date">
                    Departure Date <span className=" text-red-400">*</span>
                  </label>
                  <Input
                    {...methods.register("departureDate", {
                      required: "Departure Date is required",
                    })}
                    placeholder="Enter..."
                    type="date"
                  />
                  {errors.departureDate && (
                    <p className="text-red-500">
                      {errors.departureDate.message}
                    </p>
                  )}
                </div>
                <div className=" space-y-1">
                  <label htmlFor="Return Date">
                    Return Date <span className=" text-red-400">*</span>
                  </label>
                  <Input
                    {...methods.register("returnDate", {
                      required: "Return Date is required",
                    })}
                    placeholder="Enter..."
                    type="date"
                  />
                  {errors.returnDate && (
                    <p className="text-red-500">{errors.returnDate.message}</p>
                  )}
                </div>
                <div className=" space-y-1">
                  <label htmlFor="Accommodation Preference">
                    Accommodation Preference{" "}
                    <span className=" text-red-400">*</span>
                  </label>
                  <Select
                    {...methods.register("accommodation", {
                      required: "Accommodation Preference is required",
                    })}
                    aria-label="Accommodation Preference"
                    placeholder="Select"
                  >
                    <SelectItem
                      className=" bg-white"
                      value="Space Hotel"
                      key={"Space Hotel"}
                    >
                      Space Hotel
                    </SelectItem>
                    <SelectItem
                      className=" bg-white"
                      value="Martian Base"
                      key={"Martian Base"}
                    >
                      Martian Base
                    </SelectItem>
                  </Select>
                  {errors.accommodation && (
                    <p className="text-red-500">
                      {errors.accommodation.message}
                    </p>
                  )}
                </div>
                <div className=" space-y-1">
                  <label htmlFor="Special Requests or Preferences">
                    Special Requests or Preferences{" "}
                  </label>
                  <Input
                    {...methods.register("specialRequests")}
                    placeholder="Enter..."
                  />
                </div>
              </div>
            </div>
          )}
          {/* Health and Safety Section Implement */}
          {step === 3 && (
            <div>
              <h1 className=" text-[#003249] md:text-3xl text-2xl font-semibold py-3">
                Health and Safety
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-gray-50 p-8 rounded">
                <div className=" space-y-1">
                  <label htmlFor="Special Requests or Preferences">
                    Health Declaration <span className=" text-red-400">*</span>
                  </label>
                  <Select
                    {...methods.register("healthDeclaration", {
                      required: "Health Declaration is required",
                    })}
                    placeholder="Select"
                    aria-label="Health Declaration"
                  >
                    <SelectItem className=" bg-white" value="yes" key={"yes"}>
                      Yes
                    </SelectItem>
                    <SelectItem className=" bg-white" value="no" key={"no"}>
                      No
                    </SelectItem>
                  </Select>
                  {errors.healthDeclaration && (
                    <p className="text-red-500">
                      {errors.healthDeclaration.message}
                    </p>
                  )}
                </div>
                <div className=" space-y-1">
                  <label htmlFor="Emergency Contact Information">
                    Emergency Contact Information{" "}
                    <span className=" text-red-400">*</span>
                  </label>
                  <Input
                    {...methods.register("emergencyContact", {
                      required: "Emergency Contact Information is required",
                    })}
                    placeholder="Enter..."
                  />
                  {errors.emergencyContact && (
                    <p className="text-red-500">
                      {errors.emergencyContact.message}
                    </p>
                  )}
                </div>
                <div className=" space-y-1">
                  <label htmlFor="Medical Conditions">Medical Conditions</label>
                  <Input
                    {...methods.register("medicalConditions")}
                    placeholder="Enter..."
                  />
                </div>
              </div>
            </div>
          )}
          {/* Stepper Changing Button Implement */}
          <div className="flex justify-between mt-12">
            {step > 1 && (
              <Button
                className=" flex items-center gap-1 bg-[#003249] py-1 px-3 text-white"
                disabled={step === 1}
                onClick={prevStep}
              >
                <ArrowLeft size={20} />
                Back
              </Button>
            )}
            {step < 3 && step === 1 && isStep1Complete && (
              <Button
                className=" flex items-center gap-1"
                color="primary"
                onClick={nextStep}
              >
                Next <ArrowRight size={20} />
              </Button>
            )}
            {step < 3 && step === 2 && isStep2Complete && (
              <Button
                className=" flex items-center gap-1"
                color="primary"
                onClick={nextStep}
              >
                Next <ArrowRight size={20} />
              </Button>
            )}
            {step === 3 && (
              <Button
                className=" flex items-center ga-2 bg-[#003249] py-1 px-3 text-white"
                type="submit"
              >
                Submit Information <SendHorizontal size={20} />
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default MultiStepper;
