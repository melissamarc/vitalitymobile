import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-svg-charts";

// Componente do gráfico de progresso
const StepProgressChart = ({ steps, caloriesBurned, calorieGoal }) => {
  const data = [steps, caloriesBurned, calorieGoal]; // Dados para o gráfico

  return (
    <LineChart
      style={{
        height: 150,
        width: Dimensions.get("window").width - 40,
        marginVertical: 20,
      }}
      data={data}
      svg={{ stroke: "#4CAF50", strokeWidth: 2 }}
      contentInset={{ top: 10, bottom: 10 }}
    />
  );
};

export default StepProgressChart;
