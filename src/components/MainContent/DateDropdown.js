import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function dateDropDown(props){
    return(
        <div>
            {/* 1993 - 2019 */}
            <FormControl className="date-dropdown" style={{width:"180px", margin:"1rem"}}>
                <InputLabel id="from">From</InputLabel>
                <Select
                    labelId="from"
                    id="from-year-select"
                    value={props.fromYear}
                    onChange={e => props.updateFromYear(e.target.value) }
                    >
                    <MenuItem value={1993}>1993</MenuItem>
                    <MenuItem value={1994}>1994</MenuItem>
                    <MenuItem value={1995}>1995</MenuItem>
                    <MenuItem value={1996}>1996</MenuItem>
                    <MenuItem value={1997}>1997</MenuItem>
                    <MenuItem value={1998}>1998</MenuItem>
                    <MenuItem value={1999}>1999</MenuItem>
                    <MenuItem value={2000}>2000</MenuItem>
                    <MenuItem value={2001}>2001</MenuItem>
                    <MenuItem value={2002}>2002</MenuItem>
                    <MenuItem value={2003}>2003</MenuItem>
                    <MenuItem value={2004}>2004</MenuItem>
                    <MenuItem value={2005}>2005</MenuItem>
                    <MenuItem value={2006}>2006</MenuItem>
                    <MenuItem value={2007}>2007</MenuItem>
                    <MenuItem value={2008}>2008</MenuItem>
                    <MenuItem value={2009}>2009</MenuItem>
                    <MenuItem value={2010}>2010</MenuItem>
                    <MenuItem value={2011}>2011</MenuItem>
                    <MenuItem value={2012}>2012</MenuItem>
                    <MenuItem value={2013}>2013</MenuItem>
                    <MenuItem value={2014}>2014</MenuItem>
                    <MenuItem value={2015}>2015</MenuItem>
                    <MenuItem value={2016}>2016</MenuItem>
                    <MenuItem value={2017}>2017</MenuItem>
                    <MenuItem value={2018}>2018</MenuItem>
                    <MenuItem value={2019}>2019</MenuItem>
                </Select>
            </FormControl>

            <FormControl className="date-dropdown" style={{width:"180px", margin:"1rem"}}>
                <InputLabel id="to-select">To</InputLabel>
                <Select
                    labelId="to-select"
                    id="to-select"
                    value={props.toYear}
                    onChange={e => props.updateToYear(e.target.value) }
                    >
                    <MenuItem value={1993}>1993</MenuItem>
                    <MenuItem value={1994}>1994</MenuItem>
                    <MenuItem value={1995}>1995</MenuItem>
                    <MenuItem value={1996}>1996</MenuItem>
                    <MenuItem value={1997}>1997</MenuItem>
                    <MenuItem value={1998}>1998</MenuItem>
                    <MenuItem value={1999}>1999</MenuItem>
                    <MenuItem value={2000}>2000</MenuItem>
                    <MenuItem value={2001}>2001</MenuItem>
                    <MenuItem value={2002}>2002</MenuItem>
                    <MenuItem value={2003}>2003</MenuItem>
                    <MenuItem value={2004}>2004</MenuItem>
                    <MenuItem value={2005}>2005</MenuItem>
                    <MenuItem value={2006}>2006</MenuItem>
                    <MenuItem value={2007}>2007</MenuItem>
                    <MenuItem value={2008}>2008</MenuItem>
                    <MenuItem value={2009}>2009</MenuItem>
                    <MenuItem value={2010}>2010</MenuItem>
                    <MenuItem value={2011}>2011</MenuItem>
                    <MenuItem value={2012}>2012</MenuItem>
                    <MenuItem value={2013}>2013</MenuItem>
                    <MenuItem value={2014}>2014</MenuItem>
                    <MenuItem value={2015}>2015</MenuItem>
                    <MenuItem value={2016}>2016</MenuItem>
                    <MenuItem value={2017}>2017</MenuItem>
                    <MenuItem value={2018}>2018</MenuItem>
                    <MenuItem value={2019}>2019</MenuItem>
                </Select>
            
            
            </FormControl>
      </div>
      
    )
}