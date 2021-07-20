import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const localStorage = window.localStorage;

const produtos = [
	{
		nome: "Carrinho de mão",
		"preco": 1.50
	},
	{
		nome: "Pá",
		"preco": 1.10
	},
	{
		nome: "Facão",
		"preco": 0.8
	},
	{
		nome: "Telha",
		"preco": 0.2
	},
	{
		nome: "Tijolo",
		"preco": 0.15
	}
]

function App() {
	
	useEffect(() => {
		
		const prods = localStorage.getItem("produtos")
		if(prods) {
			setCarrinhoQtd(prods.split(",")?.length)
		}
		
	}, [])
	
	const [carrinhoQtd, setCarrinhoQtd] = useState(0);
	const carrinho = useRef<HTMLDivElement>(null);
	
	const verCarrinho = () => {
		console.log(localStorage.getItem("produtos"))
		carrinho.current.className = "carrinho active"
	}
	
	const fecharCarrinho = () => {
		carrinho.current.className = "carrinho"
	}
	
	const adicionarItem = ( produto: any) => {
		setCarrinhoQtd(carrinhoQtd + 1)
		const prods = localStorage.getItem("produtos")
		if(prods) {
			localStorage.setItem("produtos", prods+","+produto.nome)
		} else {
			localStorage.setItem("produtos", produto.nome)
		}
		
		console.log(localStorage.getItem("produtos"))
	}
	
	const limparCarrinho = () => {
		setCarrinhoQtd(0)
		localStorage.setItem("produtos", "")
		console.log(localStorage.getItem("produtos"))
	}
	
	return (
		<div className="App">
			
			<header>
				
				<h2>Lojinha do João</h2>
				
			</header>
			
			<section className="produtos">
				
				{
					produtos.map((produto, index) => {
						return (
							<div key={index}>
								<span>{produto.nome}</span>
								<button onClick={(e) => { adicionarItem(produto) }}>Adicionar</button>
							</div>
						)
					})
				}
				
			</section>
			
			<div ref={carrinho} className="carrinho">
				
				<div className="carrinhoInfo">
					<span><b>{carrinhoQtd}</b> item(s) no carrinho</span>
					<div className="botoesAcao">
						<button onClick={() => { verCarrinho() }}>Ver Carrinho</button>
						<button onClick={() => { limparCarrinho() }}>Limpar Carrinho</button>
					</div>
				</div>
				
				
				<div className="listaCarrinho">
					
					<div className="listaProdutos">
						
						Lista de produtos!
						
					</div>
					
					<div className="listaBotoes">
						<button onClick={() => { fecharCarrinho() }}>Continuar comprando</button>
						<button onClick={() => {}}>Finalizar compra</button>
					</div>
					
				</div>
			</div>
			
		</div>
	);
}

export default App;