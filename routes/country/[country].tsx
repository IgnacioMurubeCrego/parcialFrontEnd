import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
  country: string;
  capital: string;
};

export const handler: Handlers = {
  async GET(req: Request, ctx: FreshContext<unknown, Data>) {
    const country = ctx.params.country;

    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) return new Response("No API_KEY provided", { status: 500 });

    const response = await fetch(
      `https://api.api-ninjas.com/v1/country?name=${country}`,
      { headers: { "X-Api-Key": API_KEY } },
    );
    const apiData = await response.json();
    const capital = apiData[0]?.capital;
    const data: Data = { country, capital };
    console.log(`At Handler : Capital:${capital}; Country: ${country}`);
    return ctx.render(data);
  },
};

const Page = (props: PageProps<Data>) => {
  const { country, capital } = props.data;
  console.log(`At Page : Capital:${capital}; Country: ${country}`);

  return (
    <div>
      <ul>
        <li>País: {country}</li>
        <li>
          Capital: <a href={`/city/${capital}`}>{capital}</a>
        </li>
      </ul>
    </div>
  );
};
export default Page;
