import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "https://esm.sh/axios@1.8.1/index.js";
import Link from "../../components/Link.tsx";

type Data = {
  country: string;
  capital: string;
};

export const handler: Handlers = {
  async GET(req: Request, ctx: FreshContext<unknown, Data>) {
    const url = new URL(req.url);
    const country = url.searchParams.get("country");
    if (!country) return ctx.render();
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) return new Response("No API_KEY provided", { status: 500 });

    const response = await axios.get<Data>(
      `https://api.api-ninjas.com/v1/country?name=${country}}`,
      { headers: { "X-Api-Key": API_KEY } },
    );
    const data: Data = { country: country, capital: response.data.capital };
    return ctx.render(data);
  },
};

const Page = (props: PageProps<Data>) => {
  if (props) {
    return (
      <>
        <div>
          <Link capital={props.data.capital} country={props.data.country} />
        </div>
      </>
    );
  } else {
    return (
      <>
      </>
    );
  }
};
export default Page;
