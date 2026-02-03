import React from 'react'
import Header from '../../components/common/Header/Header'
import Banner from '../../components/common/Banner/Banner'
import Product from '../../components/common/Products/Product'
import Footer from '../../components/common/Footer/Footer'

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
