const logoutButton = new LogoutButton();
logoutButton.action = function() {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		} else {
			console.error("Ошибка при попытке выхода:", response.error)
		}
	});
};

ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data)
	} else {
		console.error("Ошибка при попытке выхода:", response.error);
	}
});

const ratesBoard = new RatesBoard();

function updateCurrencyRates() {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		} else {
			console.error("Ошибка получения курсов валют:", response.error);
		}
	});
}

updateCurrencyRates();
setInterval(updateCurrencyRates, 60000);


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data)
			moneyManager.setMessage(true, "Баланс успешно пополнен!");
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
};

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Конвертация выполнена успешно!");
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
};

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			moneyManager.showProfile(response.data)
			moneyManager.setMessage(true, "Перевод выполнен успешно!");
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
}

const favoritesWidget = new FavoritesWidget();


function updateFavorites() {
	ApiConnector.getFavorites((response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			console.log("Полученные пользователи:", response.data);
			moneyManager.updateUsersList(response.data);
		} else {
			console.error("Ошибка получения списка избранного:", response.error);
		}
	});
}


favoritesWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			updateFavorites();
			favoritesWidget.setMessage(true, "Пользователь добавлен в избранное!");
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	});
};

favoritesWidget.removeUserCallback = function(id) {
	ApiConnector.removeUserFromFavorites(id, (response) => {
		if (response.success) {
			updateFavorites();
			favoritesWidget.setMessage(true, "Пользователь удалён из избранного!");
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	});
};

