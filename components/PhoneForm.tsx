import { FunctionalComponent } from "preact/src/index.js";

const PhoneForm: FunctionalComponent = () => {
  return (
    <div>
      <form action="/">
        <input type="text" name="phone" placeholder="Phone Number" />
        <button type="submit">Locate Phone Number</button>
      </form>
    </div>
  );
};

export default PhoneForm;
