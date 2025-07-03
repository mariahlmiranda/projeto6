import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { close, remove, clear } from '../store/cartSlice';

// Crie o ícone em src/assets/trash.svg
const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E66767" class="bi bi-trash3-fill" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m3 0l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m3 .534l-.5 8.5a.5.5 0 1 0 .998.058l.5-8.5a.5.5 0 0 0-.998-.058Z"/></svg>`;
const trashIconDataUri = `data:image/svg+xml;base64,${btoa(trashIcon)}`;


const CartContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background-color: #E66767;
  z-index: 20;
  padding: 32px 8px;
  color: #FFEBD9;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;

  &.is-open {
    transform: translateX(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 19;
`;

const CartItem = styled.li`
  display: flex;
  background-color: #FFEBD9;
  padding: 8px;
  margin-bottom: 16px;
  position: relative;
  color: #E66767;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 8px;
  }

  h4 {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
  }
`;

const TrashButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 14px;
  margin-top: 40px;
  margin-bottom: 16px;
`;

const ActionButton = styled.button`
  background-color: #FFEBD9;
  color: #E66767;
  border: none;
  width: 100%;
  padding: 4px 0;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const FormField = styled.div`
    margin-bottom: 8px;

    label {
        font-size: 14px;
        font-weight: bold;
        display: block;
        margin-bottom: 8px;
    }

    input {
        background-color: #FFEBD9;
        border: 1px solid #FFEBD9;
        height: 32px;
        padding: 0 8px;
        width: 100%;
        color: #4B4B4B;

        &.error {
            border: 2px solid red;
        }
    }
`;

const Row = styled.div`
    display: flex;
    gap: 34px;
`;

const CheckoutTitle = styled.h3`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
`;

const ConfirmationText = styled.p`
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 24px;
`;

const Cart = () => {
  const { isOpen, items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState('cart'); // cart, delivery, payment, confirmed
  const [orderId, setOrderId] = useState('');

  const form = useFormik({
    initialValues: {
      receiver: '',
      address: '',
      city: '',
      zipCode: '',
      number: '',
      complement: '',
      cardOwner: '',
      cardNumber: '',
      cardCode: '',
      expiresMonth: '',
      expiresYear: '',
    },
    validationSchema: Yup.object({
      // Delivery validation
      receiver: Yup.string().when('currentStep', {
        is: 'delivery',
        then: () => Yup.string().min(5, 'O nome precisa ter pelo menos 5 caracteres').required('Campo obrigatório'),
      }),
      address: Yup.string().when('currentStep', {
        is: 'delivery',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      city: Yup.string().when('currentStep', {
        is: 'delivery',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      zipCode: Yup.string().when('currentStep', {
        is: 'delivery',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      number: Yup.string().when('currentStep', {
        is: 'delivery',
        then: () => Yup.string().required('Campo obrigatório'),
      }),

      // Payment validation
      cardOwner: Yup.string().when('currentStep', {
        is: 'payment',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      cardNumber: Yup.string().when('currentStep', {
        is: 'payment',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      cardCode: Yup.string().when('currentStep', {
        is: 'payment',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      expiresMonth: Yup.string().when('currentStep', {
        is: 'payment',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      expiresYear: Yup.string().when('currentStep', {
        is: 'payment',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
    }),
    onSubmit: (values) => {
      fetch('https://fake-api-tau.vercel.app/api/efood/checkout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              products: items.map(item => ({ id: item.id, price: item.preco })),
              delivery: {
                  receiver: values.receiver,
                  address: {
                      description: values.address,
                      city: values.city,
                      zipCode: values.zipCode,
                      number: Number(values.number),
                      complement: values.complement
                  }
              },
              payment: {
                  card: {
                      name: values.cardOwner,
                      number: values.cardNumber,
                      code: Number(values.cardCode),
                      expires: {
                          month: Number(values.expiresMonth),
                          year: Number(values.expiresYear)
                      }
                  }
              }
          })
      }).then(res => res.json()).then(data => {
          setOrderId(data.orderId);
          setCurrentStep('confirmed');
          dispatch(clear());
      })
    },
  });

  const closeCart = () => {
    dispatch(close());
  };

  const removeItem = (id) => {
    dispatch(remove(id));
  };

  const formatPrice = (price = 0) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getTotalPrice = () => {
    return items.reduce((acc, currentItem) => acc + currentItem.preco, 0);
  };

  const goToDelivery = () => {
      setCurrentStep('delivery');
  }

  const goToPayment = () => {
      if (form.values.receiver && form.values.address && form.values.city && form.values.zipCode && form.values.number) {
        setCurrentStep('payment');
      } else {
          alert('Preencha todos os campos da entrega para continuar.')
      }
  }

  const backToCart = () => {
      setCurrentStep('cart');
  }

  const backToDelivery = () => {
      setCurrentStep('delivery');
  }

  const checkInputError = (fieldName) => {
      const isTouched = fieldName in form.touched;
      const isInvalid = fieldName in form.errors;
      return isTouched && isInvalid ? 'error' : '';
  }

  return (
    <>
      {isOpen && <Overlay onClick={closeCart} />}
      <CartContainer className={isOpen ? 'is-open' : ''}>
        {currentStep === 'cart' && (
            <>
                {items.length > 0 ? (
                    <>
                        <ul>
                            {items.map((item) => (
                                <CartItem key={item.id}>
                                <img src={item.foto} alt={item.nome} />
                                <div>
                                    <h4>{item.nome}</h4>
                                    <p>{formatPrice(item.preco)}</p>
                                </div>
                                <TrashButton onClick={() => removeItem(item.id)}>
                                    <img src={trashIconDataUri} alt="Remover" />
                                </TrashButton>
                                </CartItem>
                            ))}
                        </ul>
                        <TotalPrice>
                            <span>Valor total</span>
                            <span>{formatPrice(getTotalPrice())}</span>
                        </TotalPrice>
                        <ActionButton onClick={goToDelivery}>Continuar com a entrega</ActionButton>
                    </>
                ) : (
                    <p style={{textAlign: 'center'}}>O carrinho está vazio.</p>
                )}
            </>
        )}
        {currentStep === 'delivery' && (
            <form onSubmit={form.handleSubmit}>
                <CheckoutTitle>Entrega</CheckoutTitle>
                <FormField>
                    <label htmlFor="receiver">Quem irá receber</label>
                    <input type="text" id="receiver" name="receiver" value={form.values.receiver} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputError('receiver')} />
                </FormField>
                <FormField>
                    <label htmlFor="address">Endereço</label>
                    <input type="text" id="address" name="address" value={form.values.address} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputError('address')} />
                </FormField>
                <FormField>
                    <label htmlFor="city">Cidade</label>
                    <input type="text" id="city" name="city" value={form.values.city} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputError('city')} />
                </FormField>
                <Row>
                    <FormField style={{width: '155px'}}>
                        <label htmlFor="zipCode">CEP</label>
                        <input type="text" id="zipCode" name="zipCode" value={form.values.zipCode} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputError('zipCode')} />
                    </FormField>
                    <FormField style={{width: '155px'}}>
                        <label htmlFor="number">Número</label>
                        <input type="text" id="number" name="number" value={form.values.number} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputError('number')} />
                    </FormField>
                </Row>
                <FormField>
                    <label htmlFor="complement">Complemento (opcional)</label>
                    <input type="text" id="complement" name="complement" value={form.values.complement} onChange={form.handleChange} onBlur={form.handleBlur} />
                </FormField>
                <ActionButton type="button" onClick={goToPayment} style={{marginTop: '16px'}}>Continuar com o pagamento</ActionButton>
                <ActionButton type="button" onClick={backToCart} style={{marginTop: '8px'}}>Voltar para o carrinho</ActionButton>
            </form>
        )}
        {currentStep === 'payment' && (
            <form onSubmit={form.handleSubmit}>
                <CheckoutTitle>Pagamento - Valor a pagar {formatPrice(getTotalPrice())}</CheckoutTitle>
                <FormField>
                    <label htmlFor="cardOwner">Nome no cartão</label>
                    <input type="text" id="cardOwner" name="cardOwner" value={form.values.cardOwner} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputError('cardOwner')} />
                </FormField>
                <Row>
                    <FormField style={{flex: 1}}>
                        <label htmlFor="cardNumber">Número do cartão</label>
                        <input type="text" id="cardNumber" name="cardNumber" value={form.values.cardNumber} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputError('cardNumber')} />
                    </FormField>
                    <FormField style={{width: '87px'}}>
                        <label htmlFor="cardCode">CVV</label>
                        <input type="text" id="cardCode" name="cardCode" value={form.values.cardCode} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputError('cardCode')} />
                    </FormField>
                </Row>
                <Row>
                    <FormField style={{flex: 1}}>
                        <label htmlFor="expiresMonth">Mês de vencimento</label>
                        <input type="text" id="expiresMonth" name="expiresMonth" value={form.values.expiresMonth} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputError('expiresMonth')} />
                    </FormField>
                    <FormField style={{flex: 1}}>
                        <label htmlFor="expiresYear">Ano de vencimento</label>
                        <input type="text" id="expiresYear" name="expiresYear" value={form.values.expiresYear} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputError('expiresYear')} />
                    </FormField>
                </Row>
                <ActionButton type="submit" style={{marginTop: '16px'}}>Finalizar pagamento</ActionButton>
                <ActionButton type="button" onClick={backToDelivery} style={{marginTop: '8px'}}>Voltar para a edição de endereço</ActionButton>
            </form>
        )}
        {currentStep === 'confirmed' && (
            <>
                <CheckoutTitle>Pedido realizado - {orderId}</CheckoutTitle>
                <ConfirmationText>
                    Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.
                </ConfirmationText>
                <ConfirmationText>
                    Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras.
                </ConfirmationText>
                <ConfirmationText>
                    Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar durante a refeição.
                </ConfirmationText>
                <ConfirmationText>
                    Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!
                </ConfirmationText>
                <ActionButton onClick={closeCart}>Concluir</ActionButton>
            </>
        )}
      </CartContainer>
    </>
  );
};

export default Cart;