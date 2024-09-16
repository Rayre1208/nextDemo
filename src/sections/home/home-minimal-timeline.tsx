import Paper from '@mui/material/Paper';
import Timeline from '@mui/lab/Timeline';
import { alpha } from '@mui/material/styles';
import TimelineDot from '@mui/lab/TimelineDot';
import Container from '@mui/material/Container';
import TimelineItem from '@mui/lab/TimelineItem';
import Typography from '@mui/material/Typography';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import Iconify from 'src/components/iconify';

import ComponentBlock from './_examples/component-block';

// ----------------------------------------------------------------------

type TimelineType = {
  key: number;
  title: string;
  des: React.ReactNode;
  time: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'inherit' | 'grey' | 'secondary';
  icon: React.ReactElement;
};

const TIMELINES: TimelineType[] = [
  {
    key: 2,
    title: '2024',
    des: (
      <p>
        React應用開發(React, NEXT.js, MUI, TS)
        <br />
        Notability 技術筆記
        <br />
        IELTS準備
      </p>
    ),
    time: '11:00 am',
    color: 'success',
    icon: <Iconify icon="mdi:react" width={24} />,
  },
  {
    key: 3,
    title: '2022-2023',
    des: '非常機車車業(竹輪)-前端工程師',
    time: '10:30 am',
    color: 'info',
    icon: <Iconify icon="game-icons:full-motorcycle-helmet" width={24} />,
  },
  {
    key: 4,
    title: '2021',
    des: '雙學士證書(管理學與文學學士)',
    time: '大學延一下',
    color: 'secondary',
    icon: <Iconify icon="maki:college" width={24} />,
  },
  {
    key: 5,
    title: '2020',
    des: (
      <p>
        友達光電實習專案-M01部門前端工程師
        <br />
        多益測驗金色證書(870)
      </p>
    ),
    time: '大學四年級延一上',
    color: 'primary',
    icon: <Iconify icon="ph:monitor" width={24} />,
  },
  {
    key: 6,
    title: '2019',
    des: (
      <p>
        大專校院資訊應用服務創新競賽，產學合作組-佳作
        <br />
        資管系第17屆畢業生專題實務成果競-第二名
      </p>
    ),
    time: '大學三年級四年級',
    icon: <Iconify icon="lucide:school" width={24} />,
  },
  {
    key: 7,
    title: '2018',
    des: (
      <p>
        與團隊參加高雄市中山大學軟體競賽(Android開發)
        <br />
        資訊管理系學會-總務長
        <br />
        語言中心主任助理
        <br />
        英語文多媒體應用(RMMV)助教
      </p>
    ),
    time: '大學二年級三年級2018',
    color: 'error',
    icon: <Iconify icon="lucide:school" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  return (
    <Container>
      <ComponentBlock title="Experience Timeline">
        <Timeline position="alternate">
          {TIMELINES.map((item) => (
            <TimelineItem key={item.key}>
              <TimelineOppositeContent>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  {item.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={item.color}>{item.icon}</TimelineDot>
                <TimelineConnector />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.12),
                  }}
                >
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.des}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </ComponentBlock>
    </Container>
  );
}
