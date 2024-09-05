"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import QRCode from "react-qr-code"; // Import QRCode from react-qr-code
import { useForm } from "react-hook-form";
import * as z from "zod";
import { bookingSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { ToastAction } from "@radix-ui/react-toast";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookTicket } from "@/app/monument/action";
import { useRouter } from "next/navigation";

interface BookingProps extends React.HTMLAttributes<HTMLDivElement> {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBookingID: React.Dispatch<React.SetStateAction<string>>;
  ticketprice: {
    adults: string;
    children: string;
  };
}

type FormData = z.infer<typeof bookingSchema>;

export function BookingForm({
  className,
  ticketprice,
  setOpen,
  setBookingID,
  ...props
}: BookingProps) {
  const { toast } = useToast();
  const [tickets, setTickets] = React.useState({
    children: "0",
    adult: "0",
  });
  const router = useRouter();
  const [price, setPrice] = React.useState("0");
  const [qrCodeValue, setQrCodeValue] = React.useState<string | null>(null); // State for QR code value
  const qrCodeRef = React.useRef<HTMLDivElement>(null); // Reference for QR code div
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
  });

  async function onSubmit(data: FormData) {
    try {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      const user_id = user.data.user?.id || " ";
      if (!user_id) {
        router.push("/login");
        router.refresh();
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      const { childrens, adults, date } = data;
      const totalPrice =
        parseInt(ticketprice.adults) * parseInt(adults) +
        parseInt(ticketprice.children) * parseInt(childrens);

      // Book the ticket and store booking ID
      const res = await bookTicket({
        user_id,
        price: totalPrice.toString(),
        childrens,
        adults,
        date,
      });
      const responseData = await JSON.parse(res);
      setBookingID(responseData.data[0].id);
      setOpen(false);

      // Generate the QR code value with booking details
      const qrData = {
        user_id,
        date,
        adults,
        childrens,
        totalPrice,
      };
      setQrCodeValue(JSON.stringify(qrData)); // Store booking data in QR code

      toast({
        variant: "default",
        title: "Success",
        description: "Ticket Successfully Booked",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while booking the ticket",
      });
      console.log(error);
    }
  }

  const handleTicketChange = (type: string, value: string) => {
    setTickets((prevTickets) => ({
      ...prevTickets,
      [type]: parseInt(value),
    }));
    const newPrice =
      parseInt(tickets.adult) * parseInt(ticketprice.adults) +
      parseInt(tickets.children) * parseInt(ticketprice.children);
    setPrice(newPrice.toString());
  };

  // Function to download the QR code
  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;

    const svgElement = qrCodeRef.current.querySelector("svg");
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "qr-code.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className={cn("grid gap-6 p-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Date of Visit Form Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Visit</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date <= new Date() || date <= new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Childrens and Adults Form Fields */}
          <div className="flex space-x-6 items-center">
            <FormField
              control={form.control}
              name="childrens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Childrens</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      handleTicketChange("children", value);
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adults</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      handleTicketChange("adult", value);
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Total Price */}
          <h3>Total: Rs{price}</h3>
          <Button type="submit">Book now</Button>
        </form>
      </Form>

      {/* Show QR Code if available */}
      {qrCodeValue && (
        <div>
          <h3>Your Ticket QR Code:</h3>
          <div ref={qrCodeRef}>
            <QRCode value={qrCodeValue} size={256} />
          </div>
          <Button onClick={downloadQRCode} className="mt-4">
            Download QR Code
          </Button>
        </div>
      )}
    </div>
  );
}
