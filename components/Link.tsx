import { FunctionalComponent } from "preact/src/index.d.ts";

interface Data {
  phone?: string;
  country?: string;
  capital?: string;
  temperature?: string;
}

const Link: FunctionalComponent<Data> = (props: Data) => {
  if(props.country && props.capital){
    const country = props.country;
    const capital = props.capital;
    return (
      <div>
        <p>País : {country}</p>
        <a href={`/city/${capital}`}>Capital : {capital}</a>
      </div>
    );
  }
  else if (props.phone && props.country) {
    const phone = props.phone;
    const country = props.country;
    return (
      <div>
        <p>Teléfono : {phone}</p>
        <a href={`/country/${country}`}>País : {country}</a>
      </div>
    );
  } else return <div></div>;
};

export default Link;
