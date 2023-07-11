import React, { useState, useEffect } from "react";

// material-ui
import { Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MaterialTable from "material-table";
import MenuItem from "@mui/material/MenuItem";

const empList = [
  {
    id: 1,
    served: 4567,
    solved: 3241,
    failed: 1432,
    siteKey: "xcd1271892948f6721790sa21899ewf",
  },
  {
    id: 2,
    served: 4567,
    solved: 3241,
    failed: 1432,
    siteKey: "xt23657189de618182g838j910i01210",
  },
  {
    id: 3,
    served: 4567,
    solved: 3241,
    failed: 1432,
    siteKey: "xduw1214678293ds8120e1872319q0930",
  },
  {
    id: 4,
    served: 4567,
    solved: 3241,
    failed: 1432,
    siteKey: "xfds31234afew567890987658765as43346",
  },
  {
    id: 5,
    served: 4567,
    solved: 3241,
    failed: 1432,
    siteKey: "zx76251as314562t9729389n7789mj64677",
  },
  {
    id: 6,
    served: 4567,
    solved: 3241,
    failed: 1432,
    siteKey: "xt23657189de618182g838j910i01210",
  },
  {
    id: 7,
    served: 4567,
    solved: 3241,
    failed: 1432,
    siteKey: "xduw1214678293ds8120e1872319q0930",
  },
  {
    id: 8,
    served: 4567,
    solved: 3241,
    failed: 1432,
    siteKey: "xduw1214678293ds8120e1872319q0930",
  },
  {
    id: 9,
    served: 4567,
    solved: 3241,
    failed: 1432,
    siteKey: "xcd1271892948f6721790sa21899ewf",
  },
];

function FilterTable() {
  const theme = useTheme();

  const [filteredData, setFilteredData] = useState(
    JSON.parse(localStorage.getItem("siteKeys"))
  );
  const [filter, setFilter] = useState(true);
  const [captchaSiteKey, setCaptchaSiteKey] = useState("all");
  const [uniqueSiteKey, setUniqueSiteKey] = useState();
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { title: "Captcha Served", field: "captchaServed" },
    { title: "Captcha Solved", field: "captchaVerified" },
    { title: "Captcha Failed", field: "captchaFailed" },
    // { title: "Site Key", field: "siteKey" },
  ];

  const handleChange = () => {
    setFilter(!filter);
  };

  useEffect(() => {
    setFilteredData(
      captchaSiteKey === "all"
        ? JSON.parse(localStorage.getItem("siteKeys"))
        : JSON.parse(localStorage.getItem("siteKeys")).filter(
            (data) => data.key === captchaSiteKey
          )
    );
  }, [captchaSiteKey]);

  return (
    <div>
      <MaterialTable
        title="Captcha Data"
        data={filteredData}
        columns={columns}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        options={{
          search: false,
          paging: false,
          headerStyle: {
            backgroundColor: theme.palette.primary.main,
            // backgroundColor: theme.palette.secondary.main,
            color: "#FFF",
          },
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
          }),
        }}
        actions={[
          {
            icon: () => (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                style={{ width: 320 }}
                autoWidth={true}
                value={captchaSiteKey}
                onChange={(e) => setCaptchaSiteKey(e.target.value)}
              >
                <MenuItem value={"all"}>
                  <em>All</em>
                </MenuItem>
                {JSON.parse(localStorage.getItem("siteKeys")).map(
                  (col, index) => (
                    <MenuItem value={col.key} key={index}>
                      {col.key}
                    </MenuItem>
                  )
                )}
              </Select>
            ),
            tooltip: "Filter",
            isFreeAction: true,
            onClick: (event) => console.log(""),
          },
        ]}
      />
    </div>
  );
}

export default FilterTable;
