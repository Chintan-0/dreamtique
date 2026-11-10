import { z } from "zod";

export const serviceTypes = ["Hotel", "Tour or experience", "Visa", "Chauffeur", "Full package"] as const;
export const destinationChoices = ["Dubai", "Georgia", "Armenia", "Another destination"] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please tell us a little more (at least 10 characters)").max(1500, "Please keep it under 1500 characters"),
});
export type ContactValues = z.infer<typeof contactSchema>;

// The booking journey is validated one step at a time.
export const bookingStepSchemas = [
  z.object({
    destination: z.enum(destinationChoices),
    otherDestination: z.string().optional(),
  }),
  z.object({
    service: z.enum(serviceTypes),
    startDate: z.string().min(1, "Please choose a travel date"),
    endDate: z.string().optional(),
    time: z.string().optional(),
  }),
  z.object({
    name: z.string().min(2, "Please enter your name"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(6, "Please enter a phone number we can reach you on"),
    travellers: z.coerce.number().int().min(1, "At least 1 traveller").max(50, "Please call us for larger groups"),
    notes: z.string().max(1500).optional(),
  }),
] as const;

export const bookingSchema = z.object({
  destination: z.enum(destinationChoices),
  otherDestination: z.string().optional(),
  service: z.enum(serviceTypes),
  startDate: z.string().min(1, "Please choose a travel date"),
  endDate: z.string().optional(),
  time: z.string().optional(),
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a phone number we can reach you on"),
  travellers: z.number().int().min(1).max(50),
  notes: z.string().max(1500).optional(),
});
export type BookingValues = z.infer<typeof bookingSchema>;
