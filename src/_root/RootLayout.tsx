const RootLayout = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <h1>The RootLayout</h1>
      </div>
      <div className="flex justify-between">
        <div className="gap-2">Left Sidebar</div>
        <div className="gap-2">Middle</div>
        <div className="mr-auto">Right Sidebar</div>
      </div>
    </div>
  );
};

export default RootLayout;
