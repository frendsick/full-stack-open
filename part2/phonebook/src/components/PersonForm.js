import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PersonForm = ({ addPersonFunction }) => {
    // Input field states
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    // Form handlers
    const handleNameChange = (event) => setName(event.target.value);
    const handleNumberChange = (event) => setNumber(event.target.value);
    const handleSubmit = (event) => {
        event.preventDefault();
        const person = {
            name: name,
            number: number,
            id: uuidv4(),
        };
        const personAdded = addPersonFunction(person);

        // Clear the input fields if person was added
        if (!personAdded) return;
        setName("");
        setNumber("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={name} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={number} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;
