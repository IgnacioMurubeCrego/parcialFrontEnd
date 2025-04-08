import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import PhoneForm from "../components/PhoneForm.tsx";
import { ValidatePhoneAPI } from "../types.tsx";

interface Data {
  phone?: string;
  country?: string;
  valid?: boolean;
}

export const handler: Handlers<Data> = {
  GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = new URL(req.url);
    const phone = url.searchParams.get("phone");
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) return new Response("No API_KEY provided", { status: 500 });

    const response = await fetch(
      `https://api.api-ninjas.com/v1/validatephone?number=${phone}`,
      { headers: { "X-Api-Key": API_KEY } },
    );
    const apiData: ValidatePhoneAPI = await response.json();
    console.log("Fetched data:", apiData);

    let data: Data = {};
    if (apiData.is_valid) {
      data = {
        phone: apiData.format_e164,
        valid: apiData.is_valid,
        country: apiData.country,
      };
    }
    console.log("Teléfono: " + phone);
    return ctx.render(data);
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <>
      <div>
        <PhoneForm data={props.data} />
      </div>
    </>
  );
};
export default Page;
