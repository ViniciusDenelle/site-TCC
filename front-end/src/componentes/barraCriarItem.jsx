import { useState } from 'react'

const BarraCriarItem = ({criarItem}) => {
    const [itemNome, setItemNome] = useState(null)

    
    function mudarItem(ev)
    {
        setItemNome(ev.target.value)
    }

    function mandarNome()
    {
        criarItem(itemNome)
    }


    return (
        <div className="p-3 bg-zinc-100 w-full
            lg:w-3/5 my-3 flex items-center flex-col">

            <h1 className="text-xl">
                criar item
            </h1>

            <div className="w-full">
                <label htmlFor="">
                    item:
                </label>

                <div className="flex justify-between w-full gap-2">

                    <input type="text"
                        className="rounded-md bg-zinc-300/50
                  cursor-pointer hover:bg-zinc-300 w-full"
                        name="item"
                        onChange={mudarItem} />

                    <button className="rounded lg bg-green-500/50
                  cursor-pointer hover:bg-green-500 p-1"
                        onClick={mandarNome}>
                        criar
                    </button>
                </div>
            </div>

        </div>
    )
}

export default BarraCriarItem