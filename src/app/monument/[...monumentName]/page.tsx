"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { monuments } from "@/constant";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/forms/booking-form";
import QRCodeGenerator from "@/components/qrCodeGenerator"; // Import QRCodeGenerator

const Page = ({
  params,
}: {
  params: {
    monumentName: string;
  };
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [bookingID, setBookingID] = useState<string>(""); // Track booking ID
  const filteredMonument = monuments.find(
    (monument) => monument.name == params.monumentName
  );
  if (!filteredMonument) return null;

  return (
    <div className="pt-6 flex flex-col space-y-4">
      <h1 className="text-5xl font-bold capitalize ml-12">
        {params.monumentName}
      </h1>
      <div className="px-12">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full border-none"
        >
          <CarouselContent className="border-none">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 h-[300px]"
              >
                <div className="">
                  <Card>
                    <CardContent className=" aspect-square">
                      <Image
                        src={filteredMonument?.image}
                        alt={filteredMonument?.name}
                        width={100}
                        height={100}
                        className="w-full aspect-video object-fill"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex space-y-3  py-6 bg-primary justify-around ">
        <div className="flex flex-col space-y-3">
          <h3 className="text-3xl font-semibold">Description</h3>
          <p className="max-w-3xl">{filteredMonument.description}</p>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-3xl font-semibold">Price</h3>
          <Separator className="my-4 bg-black" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Adults</div>
            <Separator className="bg-black" orientation="vertical" />
            <div>Rs{filteredMonument.price.adults}</div>
          </div>
          <Separator className="my-4 bg-black" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Children</div>
            <Separator className="bg-black" orientation="vertical" />
            <div>Rs{filteredMonument.price.children}</div>
          </div>
          <Separator className="my-4 bg-black" />
          <div className="mt-3 flex flex-col spacy-4">
            <span>
              Timings : {filteredMonument.openingTiming}-
              {filteredMonument.closingTiming}
            </span>
            <span>Open on : {filteredMonument.daysOpened}</span>
          </div>

          <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger asChild>
              <Button variant="secondary">Book Tickets</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Book Tickets</DialogTitle>
                <BookingForm
                  setBookingID={setBookingID}
                  setOpen={setOpen}
                  ticketprice={filteredMonument.price}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Show QR Code in dialog if bookingID is set */}
          <Dialog open={!!bookingID}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>QR Code</DialogTitle>
                <p>Download this QR code</p>
              </DialogHeader>
              <div className="flex justify-center items-center">
                <QRCodeGenerator bookingID={bookingID} />
              </div>
              <Button
                type="button"
                onClick={() => {
                  router.push(`/`);
                }}
              >
                Close
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Page;
