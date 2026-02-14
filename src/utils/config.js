import { Cloudinary } from "@cloudinary/url-gen";
import { createClient } from "@supabase/supabase-js";

// 🚨 SUPABASE
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(supabaseUrl, supabasePublishableKey);

// 🚨CLOUDINARY
// export const cld = new Cloudinary({
//   cloud: {
//     cloudName: import.meta.env.VITE_CLOUDNAME,
//   },
// });
