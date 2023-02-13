import { useState } from "react"
import api from "../../services/api"
import styles from "./style.module.css"

export const FormRequest = () => {
    const [valorVenda, setValorVenda] = useState("")
    const [qtdParcelas, setQtdParcelas] = useState("")
    const [mdr, setMdr] = useState("")
    const [res, setRes] = useState({
        1: 0,
        15: 0,
        30: 0,
        90: 0
    })

    function handleSubmit(event) {
        event.preventDefault()

        setValorVenda("")
        setQtdParcelas("")
        setMdr("")
    }

    async function sendForm() {
        try {
            const response = await api.post('', {
                "amount": valorVenda,
                "installments": qtdParcelas,
                "mdr": mdr
            })

            setRes({
                1: response.data[1],
                15: response.data[15],
                30: response.data[30],
                90: response.data[90]
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <h1>Simule sua Antecipação</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="valorVenda">Informe o valor da venda *</label>
                    <input
                        type="text"
                        id="valorVenda"
                        value={valorVenda}
                        onChange={(event) => setValorVenda(event.target.value)}
                    />

                    <label htmlFor="qtdParcelas">Em quantas parcelas *</label>
                    <input
                        type="text"
                        id="qtdParcelas"
                        value={qtdParcelas}
                        onChange={(event) => setQtdParcelas(event.target.value)}
                    />
                    <span>Máximo de 12 parcelas</span>

                    <label htmlFor="mdr">Informe o percentual de MDR *</label>
                    <input
                        type="text"
                        id="mdr"
                        value={mdr}
                        onChange={(event) => setMdr(event.target.value)}
                    />

                    <button type="submit" onClick={sendForm}>Enviar</button>
                </form>
            </div>
            <div className={styles.response}>
                <h2>VOCÊ RECEBERÁ:</h2>
                <div></div>
                <p>Amanhã: <span>R${res[1]},00</span></p>
                <p>Em 15 dias: <span>R${res[15]},00</span></p>
                <p>Em 30 dias: <span>R${res[30]},00</span></p>
                <p>Em 90 dias: <span>R${res[90]},00</span></p>
            </div>
        </>
    )

}
