import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const localStorage = window.localStorage;

const produtos = [
	{
		nome: "Carrinho de mão",
		preco: 1.50
	},
	{
		nome: "Pá",
		preco: 1.10
	},
	{
		nome: "Facão",
		preco: 0.8
	},
	{
		nome: "Telha",
		preco: 0.2
	},
	{
		nome: "Tijolo",
		preco: 0.15
	},
	{
		nome: "Colher de pedreiro",
		preco: 0.75
	},
	{
		nome: "Capacete de segurança",
		preco: 0.87
	},
	{
		nome: "Prego",
		preco: 0.08
	},
	{
		nome: "Parafuso",
		preco: 0.12
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
	const [total, setTotal] = useState(0);
	const carrinho = useRef<HTMLDivElement>(null);
	const divListaProdutos = useRef<HTMLDivElement>(null);
	const usuario = useRef<HTMLDivElement>(null);
	
	const verCarrinho = () => {
		carrinho.current.className = "carrinho active"
		
		calcularProdutos();
		
	}
	
	const calcularProdutos = () => {
		if(localStorage.getItem("produtos") !== "") {
			const listaProdutosArray = localStorage.getItem("produtos").split(",")
			const listaProdutos:any = {};
			listaProdutosArray.forEach(function(i) { listaProdutos[i] = (listaProdutos[i]||0) + 1;});
						
			divListaProdutos.current.innerHTML = ''
			
			for (const [key, value] of Object.entries(listaProdutos)) {
				divListaProdutos.current.innerHTML += `<div><span>${key}</span><span>${value}</span></div>`
			}
		}
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
		
		setTotal( total + produto.preco )
		
		calcularProdutos()
	}
	
	const limparCarrinho = () => {
		setCarrinhoQtd(0)
		setTotal(0)
		localStorage.setItem("produtos", "")
		divListaProdutos.current.innerHTML = ''
		carrinho.current.className = "carrinho"
	}
	
	const finalizarCompra = () => {
		usuario.current.className = "usuario active"
	}
	
	const voltarAoCarrinho = () => {
		usuario.current.className = "usuario"
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
								<span>{produto.preco}</span>
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
					
					<div ref={divListaProdutos} className="listaProdutos">
						
						
						
					</div>
					
					<div>
						Total <b>{total.toFixed(2)}</b>
					</div>
					
					<div className="listaBotoes">
						<button onClick={() => { fecharCarrinho() }}>Continuar comprando</button>
						<button onClick={() => { finalizarCompra() }}>Finalizar compra</button>
					</div>
					
				</div>
				
				<div ref={usuario} className="usuario">
					
					<h3>Complete seu cadastro</h3>
					
					<div>
						<span>Nome completo</span>
						<input type="text" placeholder="nome completo"/>
					</div>
					
					<div>
						<span>Email</span>
						<input type="email" placeholder="email"/>
					</div>
					
					<div>
						<span>Endereço para entrega</span>
						<input type="text" placeholder="endereço"/>
					</div>
					
					<div className="finalizarBotoes">
						<button onClick={() => { voltarAoCarrinho() }}>voltar</button>
						<button>Cadastrar e finalizar</button>
					</div>
					
					
				</div>				
				
			</div>
			
		</div>
	);
}

export default App;