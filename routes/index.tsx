import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "https://esm.sh/axios@1.8.1";
import PhoneForm from "../components/PhoneForm.tsx";
import Link from "../components/Link.tsx";

interface Data {
  phone?: string;
  country?: string;
}

export const handler: Handlers<Data> = {
  GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = new URL(req.url);
    const phone = url.searchParams.get("phone");
    if (!phone) return ctx.render();
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) return new Response("No API_KEY provided", { status: 500 });

    const response = await axios.get<Data>(
      `https://api.api-ninjas.com/v1/validatephone?number=${phone}`,
      { headers: { "X-Api-Key": API_KEY } },
    );

    const data: Data = { phone, country: response.data.country };

    return ctx.render(data);
  },
};

const Page = (props: PageProps<Data>) => {
  if (props) {
    return (
      <>
        <div>
          <PhoneForm />
        </div>
        <div>
          <Link phone={props.data.phone} country={props.data.country} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <PhoneForm />
        </div>
      </>
    );
  }
};
export default Page;
