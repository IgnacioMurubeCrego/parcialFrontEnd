import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
  country: string;
  city: string;
  temp: string;
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    const city = ctx.params.city.replaceAll("%20", " ");

    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) return new Response("No API_KEY provided", { status: 500 });

    const responseGeoCoding = await fetch(
      `https://api.api-ninjas.com/v1/geocoding?city=${city}`,
      { headers: { "X-Api-Key": API_KEY } },
    );
    const geocodingData = await responseGeoCoding.json();
    const country = geocodingData[0]?.country;
    const latitude = geocodingData[0]?.latitude;
    const longitude = geocodingData[0]?.longitude;

    const responseWeather = await fetch(
      `https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`,
      { headers: { "X-Api-Key": API_KEY } },
    );

    const weatherData = await responseWeather.json();
    const temp = weatherData.temp;

    const data: Data = { country, city, temp };
    console.log(`At Handler : City:${city}; Country: ${country}; Temp:${temp}`);
    return ctx.render(data);
  },
};

const Page = (props: PageProps<Data>) => {
  const { country, city, temp } = props.data;
  console.log(`At Page : City:${city}; Country: ${country} ; Temp:${temp}`);

  return (
    <div>
      <ul>
        <li>Ciudad: {city}</li>
        <li>
          País: <a href={`/country/${country}`}>{country}</a>
        </li>
        <li>Temperatura: {temp}</li>
      </ul>
    </div>
  );
};
export default Page;
