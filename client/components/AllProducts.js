import React from 'react'
import {fetchProducts} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    return (
      <section id="background-pic">
        <div>
          <div id="image-txt">
            <h1>All Products</h1>
            <h2>List of Products:</h2>
            <div id="all-products-wrapper">
              {products.map(product => {
                return (
                  <div className="all-product-list" key={product.id}>
                    <div className="all-product-item">
                      <Link
                        className="product-name-image"
                        to={`/products/${product.id}`}
                      >
                        <h2>{product.name}</h2>
                        <img src={product.imageUrl} />
                      </Link>
                      <p>{product.description}</p>
                      <h3>Price: {product.price}</h3>
                    </div>
                  </div>
                )
              })}
            </div>
            <div />
          </div>
          <img
            className="backgroundIMG"
            src="https://images6.alphacoders.com/992/992445.jpg"
          />
        </div>
      </section>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => {
      return dispatch(fetchProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
