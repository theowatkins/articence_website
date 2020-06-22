import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import "react-table-6/react-table.css";
import { VictoryTheme, VictoryPie, VictoryLabel } from 'victory'

const getColumnWidth = (header, filter) => filter ? Math.max(header.length * 9, 200) : header.length * 10;

const columns = [
  {
    Header: 'Serial Number',
    accessor: 'sl_no',
    width: getColumnWidth('Serial Number')
  },
  {
    Header: 'Gender',
    accessor: 'gender',
    filterMethod: (filter, row) => {
      if (filter.value === "all") {
        return true;
      }
      if (filter.value === "M") {
        return row[filter.id] === "M";
      }
      return row[filter.id] === "F";
    },
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">All</option>
        <option value="M">M</option>
        <option value="F">F</option>
      </select>
  },
  {
    Header: 'Secondary Education Percentage',
    accessor: 'ssc_p',
    width: getColumnWidth('Secondary Education Percentage', true)
  },
  {
    Header: 'Board of Education',
    accessor: 'ssc_b',
    width: getColumnWidth('Board of Education'),
    filterMethod: (filter, row) => {
      if (filter.value === "all") {
        return true;
      }
      if (filter.value === "M") {
        return row[filter.id] === "Central";
      }
      return row[filter.id] === "Others";
    },
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">All</option>
        <option value="M">Central</option>
        <option value="F">Others</option>
      </select>
  },
  {
    Header: 'Higher Secondary Education Percentage',
    accessor: 'hsc_p',
    width: getColumnWidth('Higher Secondary Education Percentage', true)
  },
  {
    Header: 'Board of Education',
    accessor: 'hsc_b',
    width: getColumnWidth('Board of Education'),
    filterMethod: (filter, row) => {
      if (filter.value === "all") {
        return true;
      }
      if (filter.value === "M") {
        return row[filter.id] === "Central";
      }
      return row[filter.id] === "Others";
    },
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">All</option>
        <option value="M">Central</option>
        <option value="F">Others</option>
      </select>
  },
  {
    Header: 'Specialization in Higher Secondary Education',
    accessor: 'hsc_s',
    width: getColumnWidth('Specialization in Higher Secondary Education')
  },
  {
    Header: 'Degree Percentage',
    accessor: 'degree_p',
    width: getColumnWidth('Degree Percentage', true)
  },
  {
    Header: 'Degree Type',
    accessor: 'degree_t',
    width: getColumnWidth('Degree Type'),
    filterMethod: (filter, row) => {
      if (filter.value === "all") {
        return true;
      }
      if (filter.value === "M") {
        return row[filter.id] === "Sci&Tech";
      }
      return row[filter.id] === "Comm&Mgmt";
    },
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">All</option>
        <option value="M">Sci&Tech</option>
        <option value="F">Comm&Mgmt</option>
      </select>
  },
  {
    Header: 'Work Experience',
    accessor: 'workex',
    width: getColumnWidth('Work Experience'),
    filterMethod: (filter, row) => {
      if (filter.value === "all") {
        return true;
      }
      if (filter.value === "M") {
        return row[filter.id] === "Yes";
      }
      return row[filter.id] === "No";
    },
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">All</option>
        <option value="M">Yes</option>
        <option value="F">No</option>
      </select>
  },
  {
    Header: 'Employability Test Percentage',
    accessor: 'etest_p',
    width: getColumnWidth('Employability Test Percentage', true)
  },
  {
    Header: 'Specialization',
    accessor: 'specialisation',
    width: getColumnWidth('Specialization'),
    filterMethod: (filter, row) => {
      if (filter.value === "all") {
        return true;
      }
      if (filter.value === "M") {
        return row[filter.id] === "Mkt&HR";
      }
      return row[filter.id] === "Mkt&Fin";
    },
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">All</option>
        <option value="M">Mkt&HR</option>
        <option value="F">Mkt&Fin</option>
      </select>
  },
  {
    Header: 'MBA Percentage',
    accessor: 'mba_p',
    width: getColumnWidth('MBA Percentage', true)
  },
  {
    Header: 'Status',
    accessor: 'status',
    filterMethod: (filter, row) => {
      if (filter.value === "all") {
        return true;
      }
      if (filter.value === "M") {
        return row[filter.id] === "Placed";
      }
      return row[filter.id] === "Not Placed";
    },
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">All</option>
        <option value="M">Placed</option>
        <option value="F">Not Placed</option>
      </select>
  },
  {
    Header: 'Salary',
    accessor: 'salary',
    width: getColumnWidth('Salary', true)
  }
];

class Chart extends Component {
  constructor(props) {
    super(props)
  }

  render() { 
    var placed = 0
    var not_placed = 0
    var salaries = []
    var data = this.props.data

    for (var i = 0; i < data.length; i++) {
      var cur_row = data[i];
      if (cur_row['status'] === 'Placed') {
        placed++;
        salaries.push(cur_row['salary']);
      }
      else {
        not_placed++;
      }
    }

    var final_data = [{ x: "Placed: " + placed.toString(), y: placed }, { x: "Not Placed: " + not_placed.toString(), y: not_placed }];
    salaries = salaries.map(s => parseInt(s));
    var sum = salaries.reduce((a, b) => a += b);
    var avg_salary = Math.round((sum/salaries.length)/1000);

    return (
      <svg width={500} height={400}>
        <VictoryPie
          theme={VictoryTheme.material}
          data={final_data}
          standalone={false}
          origin={{x: 250 }}
        />
        <VictoryLabel x={80} y={320}
          text={"Number of students represented: " + (placed + not_placed).toString()}
        />
        <VictoryLabel x={80} y={340}
          text={"Average offered salary for placed students: $" + avg_salary.toString() + ",000"}
        />
      </svg>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      data: null,
      currentData: null
    };

    this.onFilter = this.onFilter.bind(this);
  }

  componentDidMount() {
    // Simple GET request using fetch
    fetch('/get_data')
        .then(response => response.json())
        .then(data => {
          var arr = [];
          Object.keys(data).forEach(function(key) {
            arr.push(data[key]);
          });
          return arr;
        })
        .then(data => this.setState({ data: data, currentData: data }));
  }

  onFilter() {
    const currentRecords = this.selectTable.getResolvedState().sortedData;
    this.setState({currentData: currentRecords});
  }

  render () {
    return (
      <div className="App">
        {this.state.data ? 
          <div>
            <Chart data={this.state.currentData}/>
            <ReactTable
              ref={(r) => {
                this.selectTable = r;
              }}
              data={this.state.data}
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
              columns={columns}
              defaultPageSize={30}
              onFilteredChange={this.onFilter}
              className="-striped -highlight"
            /> 
          </div>
          : ''}
      </div>
    );
  }
}

export default App;
