"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { registerFormSchema } from "@/lib/schema";
import { z } from "zod";

export async function signup(formData: z.infer<typeof registerFormSchema>) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { email, password } = formData;

  const res = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  return JSON.stringify(res);
}
