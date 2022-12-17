import React, { useEffect, useRef, useState } from "react";
import "./App.scss";

const localStorage = window.localStorage;

const title = "Toy Show";

const produtos = [
    {
        nome: "Choc Bar",
        preco: 2.1,
        color: "#fecaca",
    },
    {
        nome: "Broderick Bar",
        preco: 2,
        color: "#fecaca",
    },
    {
        nome: "Galaxy",
        preco: 1.5,
        color: "#fecaca",
    },
    {
        nome: "Crisps, Popcorn",
        preco: 1.5,
        color: "#fed7aa",
    },
    {
        nome: "Donuts, Pastry",
        preco: 2.8,
        color: "#fed7aa",
    },
    {
        nome: "Brownie",
        preco: 2.8,
        color: "#fed7aa",
    },
    {
        nome: "Soft Drinks",
        preco: 3.5,
        color: "#a5f3fc",
    },
    {
        nome: "Water",
        preco: 3.5,
        color: "#a5f3fc",
    },
    {
        nome: "Fruit Shoot",
        preco: 2,
        color: "#a5f3fc",
    },
    {
        nome: "Mini Jelly",
        preco: 1.5,
        color: "#bbf7d0",
    },
    {
        nome: "Jellies",
        preco: 3.5,
        color: "#bbf7d0",
    },
    {
        nome: "Kids Box",
        preco: 10.5,
        color: "#bbf7d0",
    },
];

function App() {
    useEffect(() => {
        const prods = localStorage.getItem("produtos");
        if (prods) {
            setCarrinhoQtd(prods.split(",")?.length);
        }
    }, []);

    const [carrinhoQtd, setCarrinhoQtd] = useState(0);
    const [total, setTotal] = useState(0);
    const carrinho = useRef<HTMLDivElement>(null);
    const divListaProdutos = useRef<HTMLDivElement>(null);
    const usuario = useRef<HTMLDivElement>(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
	
	const [listCart, setListCart] = useState([]);
	
	const [isCarrinhoVisible, setIsCarrinhoVisible] = useState(false);

    const [isMaskVisible, setIsMaskVisible] = useState(false);

    const verCarrinho = () => {
        carrinho.current.className = "carrinho active";

        calcularProdutos();
    };

    const calcularProdutos = () => {
        if (localStorage.getItem("produtos") !== "") {
            const listaProdutosArray = localStorage
                .getItem("produtos")
                .split(".");
            const listaProdutos: any = {};
			
            listaProdutosArray.forEach(function (i) {
                listaProdutos[i] = (listaProdutos[i] || 0) + 1;
            });

            divListaProdutos.current.innerHTML = "";
			
			// setListCart(listaProdutos);
			
			let newList = []
			
            for (const [key, value] of Object.entries(listaProdutos)) {
				newList.push({
					name: key,
					count: value
				})
                divListaProdutos.current.innerHTML += `<div><span>${key}</span><span>${value}</span></div>`;
            }
			setListCart(newList);
        }
    };

    const fecharCarrinho = () => {
        // carrinho.current.className = "carrinho";
		setIsCarrinhoVisible(false);
		setIsMaskVisible(false);
    };

    const adicionarItem = (produto: any) => {
        setCarrinhoQtd(carrinhoQtd + 1);
        const prods = localStorage.getItem("produtos");
		
        if (prods) {
			
            localStorage.setItem("produtos", prods + "." + produto.nome);
			
        } else {
			
            localStorage.setItem("produtos", produto.nome);
			
        }

        setTotal(total + produto.preco);

        calcularProdutos();
    };

    const limparCarrinho = () => {
		setListCart([]);
        setCarrinhoQtd(0);
        setTotal(0);
        localStorage.setItem("produtos", "");
        divListaProdutos.current.innerHTML = "";
        carrinho.current.className = "carrinho";
		setIsCarrinhoVisible(false);
		setIsMaskVisible(false);
    };

    const cadastrarUsuario = () => {
        usuario.current.className = "usuario active";
    };

    const finalizarCompra = () => {
        localStorage.setItem("nome", nome);
        localStorage.setItem("email", email);
        localStorage.setItem("endereço", endereco);
        console.log(nome, email, endereco);
    };

    const voltarAoCarrinho = () => {
        usuario.current.className = "usuario";
    };

    return (
        <div className="App">
            <header>
                <h2>{title}</h2>
            </header>

            <section className="produtos">
                {produtos.map((produto, index) => {
                    return (
                        <div
                            onClick={(e) => {
                                adicionarItem(produto);
                            }}
                            className="produto"
                            key={index}
                            style={{
                                backgroundColor: `${
                                    produto.color != ""
                                        ? produto.color
                                        : "white"
                                }`,
                            }}
                        >
							{
								listCart.map(item => {
									if (item.name == produto.nome) {
										return (
											<div className="produtoCount">{item.count}</div>
										)
									}
								})
							}
							
                            <span>{produto.nome}</span>
                            <div>€ {produto.preco.toFixed(2)}</div>
                            {/* <button
								onClick={(e) => {
									adicionarItem(produto);
								}}
							>
								Adicionar
							</button> */}
                        </div>
                    );
                })}
            </section>

            <div
                className={`mask ${isMaskVisible == true ? "active" : ""}`}
                onClick={() => {
                    fecharCarrinho();
                    setIsMaskVisible(false);
                }}
            ></div>

            <div ref={carrinho} className={`carrinho ${isCarrinhoVisible == true ? "active" : ""}`}>
                <div className="carrinhoInfo"
					onClick={() => {
						setIsCarrinhoVisible(!isCarrinhoVisible);
						setIsMaskVisible(!isMaskVisible);
					}}
				>
					
                    <span>
						{ carrinhoQtd == 0 && ``}
						{ carrinhoQtd == 1 && `${carrinhoQtd} item`}
						{ carrinhoQtd > 1 && `${carrinhoQtd} items`}
                    </span>
					
					<div className="carrinhoTotal">
						<b>Total € {total.toFixed(2)}</b>
					</div>
					
                    {/* <div className="botoesAcao">
                        <button
                            
                        >
                            Ver Carrinho
                        </button>
                        <button
                            onClick={() => {
                                limparCarrinho();
                            }}
                        >
                            Limpar Carrinho
                        </button>
                    </div> */}
                </div>

                <div className="listaCarrinho">
                    <div ref={divListaProdutos} className="listaProdutos"></div>

                    {/* <div>
                        Total <b>{total.toFixed(2)}</b>
                    </div> */}

                    <div className="listaBotoes">
                        <div
                            onClick={() => {
                                limparCarrinho();
                            }}
                        >
                            CLEAR
                        </div>
                        {/* <button
                            onClick={() => {
                                cadastrarUsuario();
                            }}
                        >
                            Finalizar compra
                        </button> */}
                    </div>
                </div>

                <div ref={usuario} className="usuario">
                    <h3>Complete seu cadastro</h3>

                    <div>
                        <span>Nome completo</span>
                        <input
                            onChange={(e) => {
                                setNome(e.target.value);
                            }}
                            type="text"
                            placeholder="nome completo"
                        />
                    </div>

                    <div>
                        <span>Email</span>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            type="email"
                            placeholder="email"
                        />
                    </div>

                    <div>
                        <span>Endereço para entrega</span>
                        <input
                            onChange={(e) => {
                                setEndereco(e.target.value);
                            }}
                            type="text"
                            placeholder="endereço"
                        />
                    </div>

                    <div className="finalizarBotoes">
                        <button
                            onClick={() => {
                                voltarAoCarrinho();
                            }}
                        >
                            voltar
                        </button>
                        <button
                            onClick={() => {
                                finalizarCompra();
                            }}
                        >
                            Cadastrar e finalizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
