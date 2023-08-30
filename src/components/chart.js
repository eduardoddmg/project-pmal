import {
  Card,
  Title,
  DonutChart as DonutChartTremor,
  Subtitle,
  BarChart as BarChartTremor,
  AreaChart as AreaChartTremor,
} from "@tremor/react";

export const DonutChart = ({
  show,
  loading,
  title,
  data,
  category,
  valueFormatter,
}) => {
  if (!loading && show)
    return (
      <Card className="w-full">
        <Title>{title}</Title>
        <DonutChartTremor
          className="mt-6 h-96 w-100 text-3xl"
          data={data}
          category={category}
          index="name"
          valueFormatter={valueFormatter}
          colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          showAnimation
        />
      </Card>
    );
};

export const BarChart = ({
  show,
  loading,
  title,
  subtitle,
  data,
  categories,
  colors,
  dataFormatter,
}) => {
  if (!loading && show)
    return (
      <Card>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <BarChartTremor
          className="mt-6"
          data={data}
          index="name"
          categories={categories}
          colors={colors}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </Card>
    );
};

export const AreaChart = ({
  show,
  loading,
  title,
  data,
  categories,
  colors,
  dataFormatter,
}) => {
  if (!loading && show)
    return (
      <Card>
        <Title>{title}</Title>
        <AreaChartTremor
          className="h-72 mt-4"
          data={data}
          index="date"
          categories={categories}
          colors={colors}
          valueFormatter={dataFormatter}
        />
      </Card>
    );
};
