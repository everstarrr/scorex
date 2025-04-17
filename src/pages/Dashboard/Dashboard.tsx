import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import '../../components/Layout/Layout.css'
import { formatNumber } from "../../lib/utils";
import { traders } from "./traders";
import { Trader } from "../../types/types";

export default function Dashboard() {

    const [searchValue, setSearchValue] = useState<string>('');
    const [allTraders, setAllTraders] = useState<Trader[]>(() => {
        const saved = localStorage.getItem('favoriteTraders');
        return saved ? JSON.parse(saved) : traders;
    });

    useEffect(() => {
        localStorage.setItem('favoriteTraders', JSON.stringify(allTraders));
    }, [allTraders]);

    // Обработчик клика для добавления/удаления из избранного
    const handleToggleFavorite = (name: string) => {
        setAllTraders(prevItems =>
            prevItems.map(item =>
                item.name === name ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
    };

    // Сортировка элементов: сначала избранные
    const sortedItems = [...allTraders].sort((a, b) =>
        Number(b.isFavorite) - Number(a.isFavorite)
    );

    return (
        <>
            <div className="layout__main_search">
                <img src="/search.svg" alt="Search" />
                <input placeholder="search account" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            <table cellSpacing={0}>
                <thead>
                    <tr>
                        <th style={{ paddingLeft: '30px' }}>INFLUENCERS</th>
                        <th className="table__td">
                            <div>
                                TXID
                                <img className="arrow" src="/arrowDown.svg" alt="Arrow Down" />
                            </div>
                        </th>
                        <th className="table__td">
                            <div>
                                PROFIT
                                <img className="arrow" src="/arrowDown.svg" alt="Arrow Down" />
                            </div>
                        </th>
                        <th className="table__td">
                            <div>
                                PNLs
                                <img className="arrow" src="/arrowDown.svg" alt="Arrow Down" />
                            </div>
                        </th>
                        <th style={{ paddingRight: '40px', paddingLeft: '40px', width:'340px' }}>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.filter(val => val.name.includes(searchValue)).map((trader, index) => (
                        <tr key={index}>
                            <td className="table__maintd">
                                <div className="table__maintd_cntnr">
                                    <img onClick={() => handleToggleFavorite(trader.name)} src="/favStar.svg" alt="Star" style={{ opacity: trader.isFavorite ? '100%' : '' }} />
                                    <div className="table__maintd_token">
                                        <img src={trader.avatar} alt={trader.name} />
                                        {trader.name}
                                    </div>
                                    <a href={trader.link} className="table__maintd_x">
                                        <img src="/xWhite.svg" alt="X" />
                                        <div className="table__maintd_x_1" />
                                        <div className="table__maintd_x_2" />
                                    </a>
                                </div>
                            </td>
                            <td>
                                {trader.txid}
                            </td>
                            <td>
                                +{trader.profit} SOL
                            </td>
                            <td>
                                ${formatNumber(trader.pnls)}
                            </td>
                            <td style={{ width: '257px' }}>
                                <Button onClick={() => handleToggleFavorite(trader.name)}>
                                    {trader.isFavorite ? 'REMOVE FROM FOLLOW' : 'ADD TO FOLLOW'}
                                    </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}