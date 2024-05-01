import React from "react";
import { createClient } from "@/utils/supabase/server";
const page = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  return <div>{data.user && data.user.email}</div>;
};

export default page;
