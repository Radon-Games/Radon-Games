if [ ! -d "node_modules" ];
then 
	echo -e "\nInstalling NodeJS packages...\n"
  npm install
  echo -e "\nNodeJS packages have been installed\n"
fi

if [ ! -d "dist" ];
then 
	echo -e "\nBuilding Radon Games...\n"
  npm run build
  echo -e "\nRadon Games build successful\n"
fi

echo -e "\nStarting Radon Games...\n"
npm start
