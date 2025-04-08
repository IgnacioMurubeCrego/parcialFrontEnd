import { FunctionalComponent } from "preact/src/index.js";

interface Data {
  phone?: string;
  country?: string;
  valid?: boolean;
}

type Props = {
  data: Data;
};

const PhoneForm: FunctionalComponent<Props> = ({ data }) => {
  console.log("PhoneForm Phone: " + data.phone);
  return (
    <div>
      <form action="/" method="get">
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={data.phone ?? ""}
        />
        <button type="submit">Locate Phone Number</button>
      </form>
      <div>
        {data?.valid &&
          (
            <ul>
              <li>
                <b>Teléfono:{data.phone}</b>
              </li>
              <li>
                <b>País:</b>
                <a href={`/country/${data.country}`}>{data.country}</a>
              </li>
            </ul>
          )}
      </div>
    </div>
  );
};

export default PhoneForm;
