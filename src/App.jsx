import "./App.css";
import { useState } from "react";
import api from './Api/api';
function App() {
  const [input, setInput]  = useState('Oi');
  const [cep, setCep] = useState('');
  async function handleSearch(e) {
		e.preventDefault();
		// 01001000/json/
		if (input == '') {
			alert('Preencha algum CEP');
			return;
		}
		try {
			const response = await api.get(`${input}/json`);
			setCep(response.data);
      document.querySelector(".App__open-response").classList.add("active");
			setInput('');
			// console.log(response.data);
		} catch {
			alert('OPS erro ao buscar');
			setInput('');
		}
  }
	return (
		<section className="App">
			<h2 className="App__title">Buscador de cep</h2>
			<form action="">
				<label htmlFor="cep" className="sr-only">Digite seu cep</label>
				<input
					type="number"
					inputmode="numeric"
					name="cep"
					id="cep"
          autoComplete="off"
					placeholder="Digite seu cep"
					enterKeyHint="done"
          value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
        	<button className="App__button" onClick={handleSearch}>
            onClick
				</button>
			</form>
      {Object.keys(cep).length > 0 && (
			<div className="App__open-response">
        	<div className="App__response">
					<span><mark>cep:</mark> {cep.cep}</span>
					<span><mark>logradouro:</mark> {cep.logradouro}</span>
					<span><mark>bairro:</mark> {cep.bairro}</span>
					<span><mark>localidade:</mark> {cep.localidade}</span>
					<span><mark>uf:</mark> {cep.uf}</span>
					<span><mark>ibge:</mark> {cep.ibge}</span>
					<span><mark>ddd:</mark> {cep.ddd}</span>
					<span><mark>siafi:</mark> {cep.siafi}</span>
				</div>
        </div>
			)}
		</section>
	);
}

export default App;
