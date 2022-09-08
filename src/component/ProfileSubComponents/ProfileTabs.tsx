import React, { FC, useState } from 'react';

// Material UI imports
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Director from './Director';
import Managers from './Managers';
import Projects from './Projects';
import SkillSets from './SkillSets';
import Leaves from './Leaves';
import Trainings from './Trainings';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2, }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface IProfileTabsProps {
}

const ProfileTabs: FC<IProfileTabsProps> = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="rounded max-w-5xl mx-auto mt-4  bg-slate-200 text-[#51535D] ">

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs sx={{ width: '100%' }} value={value} onChange={handleChange} >
            <Tab label="Director" {...a11yProps(0)} />
            <Tab label="Manager" {...a11yProps(1)} />
            <Tab label="Projects" {...a11yProps(2)} />
            <Tab label="Skill Sets" {...a11yProps(3)} />
            <Tab label="Leaves" {...a11yProps(4)} />
            <Tab label="Trainings" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Director />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Managers />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Projects />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SkillSets />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Leaves />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Trainings />
        </TabPanel>
      </Box>
    </div>
  )
};

export default ProfileTabs;

