const Filter = ({ filterState, setFilterState }) => {
    return (
        <form>
            <div>
                find countries &nbsp;
                <input
                    value={filterState}
                    onChange={(event) => setFilterState(event.target.value)}
                />
            </div>
        </form>
    );
};

export default Filter;
