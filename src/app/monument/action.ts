"use server";

import { createClient } from "@/utils/supabase/server";

interface Props {
  date: Date;
  childrens: string;
  adults: string;
  price: string;
  user_id: string;
}

export async function bookTicket(formData: Props) {
  const supabase = createClient();
  const { date, childrens, adults, price, user_id } = formData;
  const res = await supabase
    .from("bookings")
    .insert({
      price: price,
      adults: adults,
      childrens: childrens,
      user_id: user_id,
      date_of_visit: date,
    })
    .select();
  return JSON.stringify(res);
}
