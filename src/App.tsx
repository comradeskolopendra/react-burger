function App() {
    return (
        <section>
            Я проживаю по адресу:
            {renderAddress("Пушкина", "Колотушкина")}
        </section>
    );
}

const renderAddress = (street: string, house: string) => {
    return (
        <div>
            <p>Улица: {street}</p>
            <p>Дом: {house}</p>
        </div>
    );
};

export default App;
