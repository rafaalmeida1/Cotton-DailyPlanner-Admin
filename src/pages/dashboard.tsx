import Head from 'next/head'
import { ChangeEvent, useEffect, useState } from 'react';
import { Header } from '../components/Header'
import { api } from '../services/dataApi';

interface SaleSchemaProps {
  loja: number;
  weekDay: string;
  date: string;
  hour: number;
  salesPerHour?: number;
  pa: number;
  tm: number;
  wap: number;
  foundation: number;
}

export default function Dashboard() {

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const [sales, setSales] = useState<SaleSchemaProps[]>([]);
  const [cancels, setCancels] = useState([]);
  const [searchStore, setSearchStore] = useState(0);
  const [searchDay, setSearchDay] = useState(today.toLocaleDateString());


  useEffect(() => {
    api.get('/sales').then(({ data }) => {
      setSales(data.data);
    })
  }, [sales]);

  return (
    <div>
      <Head>
        <title>Admin</title>
      </Head>

      <Header />

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin</h1>
        </div>
      </header>
      <main className="">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex-1">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0 flex flex-col items-center justify-center">
            <form className="mb-5">
              <div className="flex items-center justify-center">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="loja">
                    Loja
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="loja"
                      value={searchStore}
                      onChange={(e: any) => setSearchStore(e.target.value)}
                    >
                      <option selected value={0}>loja</option>
                      <option value={1}>Ig Campinas</option>
                      <option value={2}>Palladium</option>
                      <option value={3}>Shop Curitiba</option>
                      <option value={4}>Sj Rio Preto</option>
                      <option value={5}>Jockey Club</option>
                      <option value={6}>Dom Pedro</option>
                      <option value={7}>JK Iguatemi</option>
                      <option value={8}>Catarina</option>
                      <option value={9}>São Caetano</option>
                      <option value={10}>Ribeirão Preto</option>
                      <option value={11}>Jundiai</option>
                      <option value={12}>Estação Curitiba</option>
                      <option value={13}>Morumbi</option>
                      <option value={14}>Sorocaba</option>
                      <option value={15}>Ig Porto Alegre</option>
                      <option value={16}>Mocca</option>
                      <option value={17}>SB Plaza</option>
                      <option value={18}>Kids Galleria</option>
                      <option value={19}>Praia de Belas</option>
                      <option value={20}>Center Vale</option>
                      <option value={21}>Catuaí Londrina</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="data">
                    Data
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="data"
                    type="text"
                    placeholder="Date"
                    value={searchDay}
                    onChange={(e) => setSearchDay(e.target.value)}
                  />
                </div>
              </div>

            </form>


            <div className="overflow-auto rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">LOJA</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">DIA DA SEMANA</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">HORA</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">VENDA DA HORA</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">P.A</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">TM</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">WAP</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">FUNDAÇÃO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sales.map((sale, index) =>
                    searchStore == sale.loja && searchDay == sale.date && (
                      <tr key={index} className="bg-gray-50 border border-white">
                        <td className="whitespace-nowrap p-3 text-sm text-blue-600">{sale.loja}</td>
                        <td className="whitespace-nowrap p-3 text-sm text-blue-600">{sale.weekDay.toUpperCase()}</td>
                        <td className="whitespace-nowrap p-3 text-sm text-red-600">{sale.hour}</td>
                        <td className="whitespace-nowrap p-3 text-sm text-green-500">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Number(sale.salesPerHour))}</td>
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700 font-bold">{sale.pa}</td>
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700 font-bold">{sale.tm}</td>
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700 font-bold">{sale.wap}</td>
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700 font-bold">{`% ${(sale.foundation / 15).toFixed(1)}`}</td>
                        <td key={index} className="whitespace-nowrap p-3 text-sm text-green-500 font-bold">{sale.date}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  )
}
