import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from "@/components/ui/input-group";
import { ApiError } from "../../../lib/api/api-error";
import type { UserFormValues } from "../types/user.types";
import { getServerFieldName } from "../utils/user-formatters";
import { emptyUserFormValues, userFormSchema, type UserFormSchema } from "../validation/user-form.schema";

type UserFormProps = {
  defaultValues?: UserFormValues;
  isSubmitting: boolean;
  serverError?: unknown;
  submitLabel: string;
  onSubmit: (values: UserFormValues) => void;
};

type FieldProps = {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  children: ReactNode;
};

function FormField({ id, label, helper, error, children }: FieldProps) {
  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      {helper ? <FieldDescription>{helper}</FieldDescription> : null}
      <FieldError>{error}</FieldError>
    </Field>
  );
}

function FormSection({
  step,
  title,
  description,
  children
}: {
  step: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="enter-up overflow-hidden rounded-lg border border-border/80 bg-card shadow-panel">
      <div className="border-b border-border/80 bg-muted/35 p-5">
        <div className="flex items-start gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            {step}
          </span>
          <div>
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function UserForm({ defaultValues = emptyUserFormValues, isSubmitting, serverError, submitLabel, onSubmit }: UserFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    control,
    formState: { errors }
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues
  });

  const sameAddress = watch("isPermanentAddressSameAsCurrent");
  const currentAddress = watch("currentAddress");

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (sameAddress) {
      setValue("permanentAddress", currentAddress, { shouldValidate: true });
    }
  }, [currentAddress, sameAddress, setValue]);

  useEffect(() => {
    if (!(serverError instanceof ApiError)) return;
    const field = getServerFieldName(serverError.code);
    if (field) {
      setError(field, { message: serverError.message });
    }
  }, [serverError, setError]);

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit((values) => onSubmit(values))}>
      <FormSection
        step="1"
        title="Basic details"
        description="Start with the profile name and birth details."
      >
        <FieldGroup className="grid gap-4 md:grid-cols-2">
          <FormField id="name" label="Name" error={errors.name?.message}>
            <InputGroup>
              <InputGroupInput id="name" autoComplete="name" aria-invalid={Boolean(errors.name)} {...register("name")} />
            </InputGroup>
          </FormField>
          <FormField id="email" label="Email" error={errors.email?.message}>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput id="email" autoComplete="email" type="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
            </InputGroup>
          </FormField>
          <FormField id="dateOfBirth" label="Date of birth" error={errors.dateOfBirth?.message}>
            <InputGroup>
              <InputGroupInput id="dateOfBirth" type="date" aria-invalid={Boolean(errors.dateOfBirth)} {...register("dateOfBirth")} />
            </InputGroup>
          </FormField>
          <FormField id="placeOfBirth" label="Place of birth" error={errors.placeOfBirth?.message}>
            <InputGroup>
              <InputGroupInput id="placeOfBirth" aria-invalid={Boolean(errors.placeOfBirth)} {...register("placeOfBirth")} />
            </InputGroup>
          </FormField>
        </FieldGroup>
      </FormSection>

      <FormSection
        step="2"
        title="Contact details"
        description="Add the primary phone number and an optional backup."
      >
        <FieldGroup className="grid gap-4 md:grid-cols-2">
          <FormField id="primaryMobile" label="Primary mobile" helper="Main phone number for this profile." error={errors.primaryMobile?.message}>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>+91</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput id="primaryMobile" inputMode="numeric" placeholder="9876543210" aria-invalid={Boolean(errors.primaryMobile)} {...register("primaryMobile")} />
            </InputGroup>
          </FormField>
          <FormField id="secondaryMobile" label="Secondary mobile" helper="Optional, if available." error={errors.secondaryMobile?.message}>
            <InputGroup>
              <InputGroupInput id="secondaryMobile" inputMode="numeric" placeholder="Optional" aria-invalid={Boolean(errors.secondaryMobile)} {...register("secondaryMobile")} />
            </InputGroup>
          </FormField>
        </FieldGroup>
      </FormSection>

      <FormSection
        step="3"
        title="Identity details"
        description="Capture the identity numbers needed for the profile."
      >
        <FieldGroup className="grid gap-4 md:grid-cols-2">
          <FormField id="aadhaar" label="Aadhaar" helper="Enter the 12-digit number." error={errors.aadhaar?.message}>
            <InputGroup>
              <InputGroupInput id="aadhaar" inputMode="numeric" placeholder="1234 5678 9012" aria-invalid={Boolean(errors.aadhaar)} {...register("aadhaar")} />
            </InputGroup>
          </FormField>
          <FormField id="pan" label="PAN" helper="Use the ten-character format." error={errors.pan?.message}>
            <InputGroup>
              <InputGroupInput id="pan" placeholder="ABCDE1234F" aria-invalid={Boolean(errors.pan)} {...register("pan")} />
            </InputGroup>
          </FormField>
        </FieldGroup>
      </FormSection>

      <FormSection
        step="4"
        title="Address"
        description="Add the current address and permanent address."
      >
        <FieldGroup>
          <FormField id="currentAddress" label="Current address" error={errors.currentAddress?.message}>
            <InputGroup className="h-auto">
              <InputGroupTextarea className="min-h-24" id="currentAddress" aria-invalid={Boolean(errors.currentAddress)} {...register("currentAddress")} />
            </InputGroup>
          </FormField>
          <Controller
            control={control}
            name="isPermanentAddressSameAsCurrent"
            render={({ field }) => (
              <Field orientation="horizontal">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                  id="isPermanentAddressSameAsCurrent"
                />
                <FieldLabel htmlFor="isPermanentAddressSameAsCurrent">
                  Permanent address is same as current address
                </FieldLabel>
              </Field>
            )}
          />
          <FormField id="permanentAddress" label="Permanent address" error={errors.permanentAddress?.message}>
            <InputGroup className="h-auto" data-disabled={sameAddress}>
              <InputGroupTextarea
                id="permanentAddress"
                className="min-h-24"
                disabled={sameAddress}
                aria-invalid={Boolean(errors.permanentAddress)}
                {...register("permanentAddress")}
              />
            </InputGroup>
          </FormField>
        </FieldGroup>
      </FormSection>

      <div className="flex flex-col-reverse gap-3 rounded-lg border border-border/80 bg-card p-3 shadow-panel sm:flex-row sm:items-center sm:justify-end">
        {serverError instanceof ApiError && !getServerFieldName(serverError.code) ? (
          <p className="self-center text-sm text-destructive">{serverError.message}</p>
        ) : null}
        <Button type="submit" disabled={isSubmitting}>
          <Check data-icon="inline-start" />
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
