import React, { useEffect, useState } from "react";
import Header from "./header";
import {Grid} from '@material-ui/core'
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { useContext } from "react";
import { ThemeContext } from "./themeContext";

function Body() {
  const{setTheme}=useContext(ThemeContext)
  const{theme}=useContext(ThemeContext)
    const [data, setData] = useState([]);
    const [maritalStatus, setMaritalStatus] = useState("");
    const [disableChildren, setDisableChildren] = useState(false);
    const [disableParentInLaw, setDisableParentInLaw] = useState(false);
    const [categoryTyp,setCategoryTyp]=useState("")
    const[numberOfchildren,SetNumberOfchildren]=useState(0)
    const[numberOfdirectParent,setNumberOfdirectParent]=useState(0)
    const[numberOfDirectParentInLaw,setNumberOfDirectParentInLaw]=useState(0)
    const[premiumFrequency,setPremiumFrequency]=useState("")
    const[SelectedCategoryType,setSelectedCategoryType]=useState(null)
    const[monthlyPremium,setMonthlyPremium]=useState(0)
    const[baseKids,setBaseKids]=useState(0)
    const[MonthlyMinSavings,setMonthlyMinSavings]=useState(0)
    const[AnnualyPremium,setAnnualyPremium]=useState(0)
    const[AnnualyMinSavings,setAnnualyMinSavings]=useState(0)
    const [ MonthlyAddPremium,setMonthlyAddPremium]=useState(0)
    const[AnnualyAddPremium,setAnnualyAddPremium]=useState(0)
    const[MonthlyAddPmParent,setMonthlyAddPmParent]=useState(0)
    const[MonthlyBkids,setMonthlyBkids]=useState(0)
    const [riskPremium, setRiskPremium] = useState(0);
    const[AnnualBkids,setAnnualBkids]=useState(0)
    const [AnnualRiskPremium,setAnnualRiskPremium]=useState(0)
    const[resultt,setResultt]=useState(0)
    const[TotalAmountForaddParent,setTotalAmountForaddParent]=useState(0)
    const[TotalAmountForaddParentAnually,setTotalAmountForaddParentAnually]=useState(0)
    const[TotalAmountForaddParentInLaw,setTotalAmountForaddParentInLaw]=useState(0)
    const[TotalAmountForaddParentInLawAnually,setTotalAmountForaddParentInLawAnually]=useState(0)
    const[childrenInPut,setChildrenInput]=useState(false)
    const[PolicyholderSumInsured,setPolicyholderSumInsured]=useState(0)
    const[SpouseSumInsured,setSpouseSumInsured]=useState(0)
    const[KidsSumInsured,setKidsSumInsured]=useState(0)
    const[ParentSumInsured,setParentSumInsured]=useState(0)
    const[FuneralAmount,setFuneralAmount]=useState(0)
    const[HospitalAmount,setHospitalAmount]=useState(0)
    const[DriverEmergencyAmount,setDriverEmergencyAmount]=useState(0)
    const handleChange=()=>{
      setTheme(theme==="light"?"dark":"light")
    }
    useEffect(()=>{
     if(theme==="dark"){
      document.documentElement.classList.add("dark")
     }
     else{
      document.documentElement.classList.remove("dark")
     }
    },[theme])

  const category = async () => {
    const result = await fetch("http://localhost:5000/");
    const result2 = await result.json();
    setData(result2.recordsets);
    console.log(result2);
  };

  useEffect(() => {
    category();
    
  }, []);
  useEffect(() => {
      if(maritalStatus==="Single"){
        setRiskPremium(monthlyPremium);
        setAnnualRiskPremium(AnnualyPremium);
      }
      else{

        if(numberOfdirectParent!=0 && numberOfDirectParentInLaw!=0)
        {
         setRiskPremium(monthlyPremium + MonthlyBkids+MonthlyAddPmParent+MonthlyAddPmParent);
         setAnnualRiskPremium(AnnualyPremium+AnnualBkids+MonthlyAddPmParent*12+MonthlyAddPmParent*12);
        }
        else if(numberOfdirectParent==0 && numberOfDirectParentInLaw==0)
        {
         setRiskPremium(monthlyPremium + MonthlyBkids);
         setAnnualRiskPremium(AnnualyPremium+AnnualBkids);
        }
        else{
         setRiskPremium(monthlyPremium + MonthlyBkids+MonthlyAddPmParent);
         setAnnualRiskPremium(AnnualyPremium+AnnualBkids+MonthlyAddPmParent*12);
        }
      }
      
       
   
  }, [monthlyPremium, MonthlyBkids,AnnualyPremium,AnnualBkids,MonthlyAddPmParent,TotalAmountForaddParent,TotalAmountForaddParentAnually,TotalAmountForaddParentInLaw,TotalAmountForaddParentInLawAnually,maritalStatus]);

  const handleMaritalStatusChange = (e) => {
    let selectedStatus = e.target.value;
     setMaritalStatus(selectedStatus);
    console.log("martual is:"+selectedStatus)

    if (selectedStatus === "Single") {
      SetNumberOfchildren(0)
      setDisableChildren(true);
      setDisableParentInLaw(true);
      
        
    } else {
      setDisableChildren(false);
      setDisableParentInLaw(false);
     
    }
  };
  
  const handleCategoryTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedCategoryType(selectedType);
    
   console.log(selectedType)
   for(let i=0;i<data.length;i++){
    const selectedData=data[i].find(items=>items.CategoryType===selectedType)
    if (selectedData) {
      console.log("Monthly Premium:", selectedData.MonthlyPremium);
      setMonthlyPremium(selectedData.MonthlyPremium)
      setRiskPremium(selectedData.MonthlyPremium + MonthlyBkids);
        setAnnualRiskPremium(AnnualyPremium + AnnualBkids);
   
    } else {
      console.log("Not found");
    }
  };
  for(let m=0;m<data.length;m++){
    const selectedDataa=data[m].find(itemss=>itemss.CategoryType===selectedType)
    if (selectedDataa) {
      console.log("Basekids:", selectedDataa.BaseKids);
      setBaseKids(selectedDataa.BaseKids)
      
    } else {
      console.log("Not found");
    }
  };
  for(let n=0;n<data.length;n++){
    const selectedDataaa=data[n].find(itemsss=>itemsss.CategoryType===selectedType)
    if (selectedDataaa) {
      console.log("MonthlyMinSavings:", selectedDataaa.MonthlyMinSavings);
      setMonthlyMinSavings(selectedDataaa.MonthlyMinSavings)
    } else {
      console.log("Not found");
    }
  };
  for(let p=0;p<data.length;p++){
    const selectedDataaaa=data[p].find(itemssss=>itemssss.CategoryType===selectedType)
    if (selectedDataaaa) {
      console.log("AnnualyPremium:", selectedDataaaa.AnnualyPremium);
      setAnnualyPremium(selectedDataaaa.AnnualyPremium)
    } else {
      console.log("Not found");
    }
  };
  for(let q=0;q<data.length;q++){
    const selectedDataaaaa=data[q].find(itemsssss=>itemsssss.CategoryType===selectedType)
    if (selectedDataaaaa) {
      console.log("AnnualyMinSavings:", selectedDataaaaa.AnnualyMinSavings);
      setAnnualyMinSavings(selectedDataaaaa.AnnualyMinSavings)
    } else {
      console.log("Not found");
    }
  };
  for(let q=0;q<data.length;q++){
    const selectedDataaaaa=data[q].find(itemsssss=>itemsssss.CategoryType===selectedType)
    if (selectedDataaaaa) {
      console.log("MonthlyAddPremium:", selectedDataaaaa.MonthlyAddPremium);
      setMonthlyAddPremium(selectedDataaaaa.MonthlyAddPremium)
    } else {
      console.log("Not found");
    }
  };
  for(let q=0;q<data.length;q++){
    const selectedDataaaaa=data[q].find(itemsssss=>itemsssss.CategoryType===selectedType)
    if (selectedDataaaaa) {
      console.log("AnnualyAddPremium:", selectedDataaaaa.AnnualyAddPremium);
      setAnnualyAddPremium(selectedDataaaaa.AnnualyAddPremium)
    } else {
      console.log("Not found");
    }
  };
  for(let q=0;q<data.length;q++){
    const selectedDataaaaa=data[q].find(itemsssss=>itemsssss.CategoryType===selectedType)
    if (selectedDataaaaa) {
      console.log("MonthlyAddPmParent:", selectedDataaaaa.MonthlyAddPmParent);
      setMonthlyAddPmParent(selectedDataaaaa.MonthlyAddPmParent)
    } else {
      console.log("Not found");
    }
  };
  for(let x=0;x<data.length;x++){
    const selectedDataaaaa=data[x].find(itemsssss=>itemsssss.CategoryType===selectedType)
    if (selectedDataaaaa) {
      console.log("PolicyholderSumInsured:", selectedDataaaaa.PolicyholderSumInsured);
      setPolicyholderSumInsured(selectedDataaaaa.PolicyholderSumInsured)
      setSpouseSumInsured(selectedDataaaaa.SpouseSumInsured)
      setKidsSumInsured(selectedDataaaaa.KidsSumInsured)
      setParentSumInsured(selectedDataaaaa.ParentSumInsured)
      setFuneralAmount(selectedDataaaaa.FuneralAmount)
      setHospitalAmount(selectedDataaaaa.HospitalAmount)
      setDriverEmergencyAmount(selectedDataaaaa.DriverEmergencyAmount)

    } else {
      console.log("Not found");
    }
  };
   }
   
  
   const numberOfChildreen=(e)=>{
    SetNumberOfchildren(e.target.value)
      let  number=e.target.value
      console.log(number)
      if(number<0)
      {
        setChildrenInput(true)
      }
      else{
        setChildrenInput(false)
      }
     if(number>baseKids)
    {
     let  result=number-baseKids
      setResultt(result)
      setMonthlyBkids(result*MonthlyAddPremium)
      console.log(result*MonthlyAddPremium)
      setAnnualBkids(result*AnnualyAddPremium)
    }
    else{
      setRiskPremium(monthlyPremium + MonthlyBkids+TotalAmountForaddParent+TotalAmountForaddParentInLaw)
      setAnnualRiskPremium(AnnualyPremium+AnnualBkids+TotalAmountForaddParentAnually+TotalAmountForaddParentInLawAnually)
      setMonthlyBkids(0)
      setAnnualBkids(0)
      
    } 
   }
  const NumberofParent=(e)=>{
      console.log(e.target.value)
      setNumberOfdirectParent( parseInt(e.target.value))
      const number=e.target.value
     let  totalAmount=0 
     
     if(number==0)
     {
      totalAmount=0
     }
     else{
      totalAmount=MonthlyAddPmParent
      console.log("total amount are:",totalAmount)
     } 
    
     if(maritalStatus==="Single")
     {
      setTotalAmountForaddParent(0)
      setTotalAmountForaddParentAnually(0)
      SetNumberOfchildren(0)
      setRiskPremium(monthlyPremium)
     }
     else{
      setTotalAmountForaddParent(totalAmount)
      setTotalAmountForaddParentAnually(totalAmount*12)
     }
    
  }
  const NumberofParentInLaw=(e)=>{
    console.log(e.target.value)
    setNumberOfDirectParentInLaw(e.target.value)
    const number=e.target.value
    let  totalAmount=0
    if(number==0)
    {
     totalAmount=0   
    }
    else{
      totalAmount=MonthlyAddPmParent
    }
     
   console.log(totalAmount)
   setTotalAmountForaddParentInLaw(totalAmount)
   setTotalAmountForaddParentInLawAnually(totalAmount*12)
}
if(SelectedCategoryType!=null)
{
  
}

  
  return (
    <div className=" dark:bg-darkModeColor">
      <div className=" flex justify-end  mr-72">
        {
          theme==="light"?<div className="text-black  font-myfontfamily text-myfontsize font-myfontweight tracking-myletterspacing">light mode  <ToggleOffIcon fontSize="large"   onClick={handleChange}  /> </div>:<div className="text-white  font-myfontfamily text-myfontsize font-myfontweight tracking-myletterspacing">dark mode <ToggleOnIcon fontSize="large" onClick={handleChange} /> </div>
        }
      </div>
       <div className=" font-myfontfamily text-tilemyfontsizeeee  font-myfontweightttt tracking-myletterspacing  bg-red-500  text-white flex justify-center">
        {
      childrenInPut===true?<div>Number of childreen must be non negative number</div>:<div></div>
     }
           </div>
         
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3,lg:8 }} style={{ marginTop: '8px', marginLeft: '2px', marginRight: '2px' }}  item justifyContent="center" xl={12}  lg={12}  spacing={10} alignItems="center">
    {/* <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3,lg:8 }} style={{ marginTop: '8px', marginLeft: '2px', marginRight: '2px' }}  item justifyContent="center" xl={12}  lg={12}  spacing={10} alignItems="center" ></Grid> */}

    <Grid  item  xl={6}  lg={6}  style={{ maxHeight: '680px',maxWidth:'500px' }}>
    <div className=" dark:text-white underline underline-offset-4  mb-3  flex justify-center  mx-auto  font-myfontfamily text-myfontsize font-myfontweight tracking-myletterspacing text-black ">
       Input
</div>
       
      <div  
        className="relative overflow-x-auto  shadow-lg  shadow-black/90 sm:rounded-lg max-w-md mx-auto"
        style={{ maxHeight: '325px' }}
      >
       
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">Field</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:text-white">
              <td className="px-4 py-3 font-medium  text-gray-900 whitespace-nowrap dark:text-white">
                Marital status
              </td>
              <td className="px-4 py-3 dark:bg-darkModeColor">
                <select className="w-full dark:bg-darkModeColor"  onChange={handleMaritalStatusChange}>
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                  <option value="Other">Other</option>
                </select>
              </td>
              <td className="px-4 py-3">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"></a>
              </td>
            </tr>
            <tr className=" dark:border-gray-700 dark:bg-gray-700">
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                Category
              </td>
              <td className="px-4 py-3">
                <select className="w-full dark:bg-darkModeColor dark:text-white" onChange={handleCategoryTypeChange}>
                  {data &&
                    data.map((array) =>
                      array.map((item) => (
                        <option value={item.CategoryType} key={item.Id_Record}>
                          {item.CategoryType}
                        </option>
                      ))
                    )}
                </select>
              </td>
              <td className="px-4 py-3">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"></a>
              </td>
            </tr>
            <tr className="bg-white dark:text-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Number of Direct Parent
              </td>
              <td className="px-4 py-3">
                <select className="w-full dark:bg-darkModeColor" onInput={NumberofParent} defaultValue={"0"} >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </td>
              <td className="px-4 py-3">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"></a>
              </td>
            </tr>
           {
            maritalStatus!="Single"&&( <tr className="border-b dark:text-white bg-gray-50 dark:bg-gray-700 dark:border-gray-700">
            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Number of Direct Parent in Law
            </td>
            <td className="px-4 py-3">
              <select className="w-full dark:bg-darkModeColor" disabled={disableParentInLaw} onInput={NumberofParentInLaw}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </td>
            <td className="px-4 py-3">
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"></a>
            </td>
          </tr>)
           }
            <tr className=" dark:text-white">
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Premium Frequency
              </td>
              <td className="px-4 py-3">
                <select className="w-full dark:bg-darkModeColor" onChange={(e)=>{
                   setPremiumFrequency(e.target.value)
                   console.log(e.target.value)
                }}>
                  <option value="Monthly">Monthly</option>
                  <option value="Annually">Annually</option>
                </select>
              </td>
              <td className="px-4 py-3">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"></a>
              </td>
            </tr>
          {
            maritalStatus!="Single"&&(  <tr className="border-b dark:text-white bg-gray-50 dark:bg-gray-700 dark:border-gray-700">
            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Number Of Children
            </td>
            <td className="px-4 py-3">
              <input className=" w-32 dark:bg-darkModeColor"  type="number" disabled={disableChildren}  onInput={numberOfChildreen} />
            </td>
            <td className="px-4 py-3">
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"></a>
            </td>
          </tr>)
          }
          </tbody>
        </table>
      </div>
     
      </Grid>
      <Grid xl={6} lg={6}  item style={{maxWidth:'500px'}}>
      <div className=" dark:text-white underline underline-offset-4  mb-3  flex justify-center  mx-auto  font-myfontfamily text-myfontsize font-myfontweight tracking-myletterspacing text-black ">
  Premium 
</div>
      <div className="relative overflow-x-auto  sm:rounded-lg mx-auto  shadow-lg  shadow-black/80">
        <table className=" dark:text-white w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
              </th>
              <th scope="col" className="px-6 py-3">
                Monthly
              </th>
              <th scope="col" className="px-6 py-3">
                Annual
              </th>
            </tr>
          </thead>
          <tbody className="space-y-11">
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-10 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Risk Premium
              </td>
              <td className="px-6">
              {riskPremium}
              </td>
              <td className="px-6">
               {AnnualRiskPremium}
              </td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-10 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Saving Premium
              </td>
              <td className="px-6 py-4">
              {MonthlyMinSavings}
              </td>
              <td className="px-6 py-4">
                {AnnualyMinSavings}
              </td>
            </tr>
            <tr className="bg-white border-b  dark:bg-gray-900 dark:border-gray-700">
              <td className=" dark:text-white px-6 py-10 font-medium text-gray-900 whitespace-nowrap dark:textwhite">
                Total Premium
              </td>
              <td className="px-6 py-4">
                {riskPremium+MonthlyMinSavings}
              </td>
              <td className="px-6 py-4">
                {AnnualRiskPremium+AnnualyMinSavings}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </Grid>
    </Grid>
  
    <div className=" dark:text-white underline underline-offset-4 mt-6  mb-3  flex justify-center  mx-auto  font-myfontfamily text-myfontsize font-myfontweight tracking-myletterspacing text-black ">
       Covers
</div>
     <div className=" dark:text-white mb-10   flex justify-center mx-56 relative  sm:rounded-lg  shadow-lg shadow-black/80 ">
  <table className=" dark:text-white w-full text-sm text-left text-gray-500 ">
   
    <tbody className="space-y-11">
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <td className="px-6 py-10 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        Policyholder Sum Insured

        </td>
        <td className="px-6">
          {PolicyholderSumInsured}
        </td>
        <td className="px-6">
         
        </td>
      </tr>
      <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-10 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        Spouse Sum Insured

        </td>
        <td className="px-6 py-4">
          {SpouseSumInsured}
        </td>
        <td className="px-6 py-4">
          
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <td className="dark:text-white px-6 py-10 font-medium text-gray-900 whitespace-nowrap dark:textwhite">
        Kids Sum Insured

        </td>
        <td className="px-6 py-4">
          {KidsSumInsured}
        </td>
        <td className="px-6 py-4">
          
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className=" dark:text-white px-6 py-10 font-medium text-gray-900 whitespace-nowrap dark:textwhite ">
        ParentSumInsured

        </td>
        <td className="px-6 py-4">
          {ParentSumInsured}
        </td>
        <td className="px-6 py-4">
        
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <td className=" dark:text-white px-6 py-10 font-medium text-gray-900 whitespace-nowrap dark:textwhite">
        Funeral Amount

        </td>
        <td className="px-6 py-4">
          {FuneralAmount}
        </td>
        <td className="px-6 py-4">
        
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className=" dark:text-white px-6 py-10 font-medium text-gray-900 whitespace-nowrap dark:textwhite">
        Hospital Amount

        </td>
        <td className="px-6 py-4">
          {HospitalAmount}
        </td>
        <td className="px-6 py-4">
          
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <td className=" dark:text-white px-6 py-10 font-medium text-gray-900 whitespace-nowrap dark:textwhite">
        Driver Emergency Amount

        </td>
        <td className="px-6 py-4">
          {DriverEmergencyAmount}
        </td>
        <td className="px-6 py-4">
          
        </td>
      </tr>
      
    </tbody>
  </table>
</div>
 
      
    </div>
  );
}

export default Body;
