import styled from 'styled-components'
import { BASE_URL, Button } from '../../App'


const SearchedResult = ({ data }) => {
    return (
        <FoodCardsContainer>
            <FoodCards>
                {data?.map((food) => (
                    <FoodCard key={BASE_URL + food.image}>
                        <div className="food_image">
                            <img src={BASE_URL + food.image} alt="" />
                        </div>
                        <div className="food_info">
                            <h3>{food.name}</h3>
                            <p>{food.text}</p>
                            <Button className='button'>Rs {food.price.toFixed(2)}</Button>
                        </div>


                    </FoodCard>
                ))}

            </FoodCards>
        </FoodCardsContainer>
    )
}

export default SearchedResult;
const FoodCardsContainer = styled.section`
  background-image:url("/images/bg.png") ;
  background-size: cover;
  min-height:  calc(100vh - 158px);
`

const FoodCards = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  row-gap: 32px;
  column-gap: 20px;
  padding-top: 30px;
`

const FoodCard = styled.div`
     background-color: #2c2a2a;
     width:340px;
     height: 167px;
    display: flex;
    border: 1px solid black;
     padding: 10px;
     border-radius: 15px;
     transition: 0.5s background;
    cursor: pointer;
    
    

    .food_info h3{
        font-size: 16px;
    }
    .food_info p{
        font-size: 12px;
        margin: 10px;
    }

    .button{
        display: grid;
        place-content: end;
        margin: 10px;
    }
    
    &:hover{
     background-color: #bdb9b9;
     color: #2c2a2a;
 
    }
    
    .food_image img{
        &:hover{
            transform: scale(110%,110%);
            transition:1s ease;
        }
    }
    `