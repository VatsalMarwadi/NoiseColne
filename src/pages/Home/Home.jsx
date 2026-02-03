import React from 'react'
import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import Product from '../../components/Products/Product'
import Footer from '../../components/Footer/Footer'

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <Product
        title="Featured Products"
        subtitle="India's No.1 Smart Wearable Brand — Smart Watches & Earbuds at best price"
      />
      <Footer />
    </div>
  )
}
