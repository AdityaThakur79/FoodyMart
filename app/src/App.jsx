import styled from "styled-components"
import "./App.css"
import { useEffect, useState } from "react";
import FoodCard from "./components/FetchedData/SearchedResult";

export const BASE_URL = "http://localhost:9000"

const App = () => {

  const [data, SetData] = useState(null);
  const [filteredData, SetFilteredData] = useState(null);
  const [error, SetError] = useState(null);
  const [loading, SetLoading] = useState(false);
  const [selectedBtn, SetSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      SetLoading(true)

      try {

        const response = await fetch(BASE_URL);
        const convertedData = await response.json();
        SetData(convertedData);
        SetFilteredData(convertedData);
        SetLoading(false);
        console.log(convertedData);
      }

      catch (error) {
        SetError("Unable to Fetch Data");
      }

    }
    fetchData();
  }, [])


  if (error) return <div>{error}</div>
  if (loading) return <div>Loading.......</div>

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue == "") {
      SetFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase()));
    SetFilteredData(filter);
  }

  // if (filteredData == null)
  //   return <div>No Matching Data Found</div>

  const filterFood = (type) => {
    if (type == "all") {
      SetFilteredData(data);
      SetSelectedBtn("all");
      return;
    }

    const filterType = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase()));

    SetFilteredData(filterType);
    SetSelectedBtn(type);
  }

  const buttons = [
    {
      name:"All",
      type:"all"
    },
    {
      name:"BreakFast",
      type:"breakfast"
    },
    {
      name:"Lunch",
      type:"lunch"
    },
    {
      name:"Dinner",
      type:"dinner"
    }
  ]
  return (
    <>
      <MainContainer>
        <TopSec>
          <div className="logo">
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <div className="search_tab">
            <input placeholder="Search Food" onChange={searchFood}></input>
          </div>
        </TopSec>

        <FilterContainer>
          {
            buttons.map((value) => 
            <Button key={value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>)
          }
        </FilterContainer>
      </MainContainer>
      <FoodCard data={filteredData} />

    </>
  )
};

export default App;

const MainContainer = styled.div`
background-color:#323334;
`;

const TopSec = styled.div`
display: flex;
justify-content: space-between;
padding-left: 25px;
padding-right: 25px;
padding-top: 25px;

.search_tab input{
  padding: 8px 26px;
 border-radius: 4px;
 border: none;
}

 
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  height: 90px;
`

export const Button = styled.button`
  color: white;
  background-color: #d91313;
  padding: 8px 30px;
  border-radius: 4px;
  border: none;
  transition: 0.5s background;
  cursor: pointer;
 
  &:hover{
    background-color: red;
    
  }
`

