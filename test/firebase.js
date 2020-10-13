const expect = require("chai").expect;
const assert = require("chai").assert;
const firebase = require("../utils/firebase");
const profileControler = require("../controllers/profile");
const { Assertion } = require("chai");

describe("Firebase Tests", () => {
	it("should upload an image", async () => {
		try {
			const downloadUrl = await firebase.uploadImage(
				"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",
				"test/testImage1"
			);
			assert.isNotNull(downloadUrl, "download url found null");
		} catch (err) {
			assert.fail(err);
		}
	});

	it("should update an image", async () => {
		try {
			const downloadUrl = await profileControler.updatePicture(
				"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",
				"test/testImage2"
			);
			assert.isNotNull(downloadUrl, "download url found null");
		} catch (err) {
			assert.fail(err);
		}
	});

	it("should delete a folder with prefix", async () => {
		try {
            await profileControler.updatePicture(
				"/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEBAVFRAVFRUVFRUWFRUVFQ8VFRUWFhUWFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0fHx0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK//AABEIAKgBLAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EADwQAAEDAgQDBgQEBQQCAwAAAAEAAhEDBAUSITFBUWETIjJxgZEGFKGxQsHR8BUjUmLhU3KC8aLSFjND/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAJhEBAQACAgICAgEFAQAAAAAAAAECERIhAxMxQQRRYSIjcYGhFP/aAAwDAQACEQMRAD8AlCIIQiC4tCCIIQiCAgiCEIlQ4RBCEQQEE6FOgdOmToHSRUwNSTo0Fx9OA8zA9VCe08UAjkNPYrln5scMtV2w8OWc3EqSBjwRIP6joQiXSWWbjlZZdU6SZJVDpJkkCThhiY0RPeG91sGpxJ1bT6Rxd9Ao7a5cH9lUcXNeHRP4XNBcI5DSI6rhl+RjMuMejH8fK48iSSTLu85JikmKBimKcoSgYpinQlQCUJRFASgEoSiKAlADlE9SOUT1BBUUSlqKJBrBEEAKIFUGEQQAogUBhECgBTyqDBRBRgogUBgpwgBRAoCToZSQG4dx/wDtA93tVwt7uyptkhwG5aY9NfyROvm5W690jTz5Lxeef3N39Po/jd+LU/bOxBrmHtGeo4OHJWra4a9oc06H3HQ9VWu6uYGAYXN2t9Ut3OlhNMmeG3MTx9VrxZac/Phvv7dlKUrOtcYbUAaxsOd4cxgzyjl16KA4w4uLGMaXNP8AV4w3xx1BC9POPJcbGxKr3l5khrT/ADXDu/2N2zefAepVariGUB2XMHbAOGg6nn5LFpmq6s6pU6QNNBGw6ACFyz8m5qO3j8fe66G2GUATqhbUmvSGmjp/8SN1mOxEARDp8kWG3E1mjo52v+0wvNwtse/lJjf8NxJMmK+g+QcoUiU0oEUJKRTEqBFCUiUJKBEoCnJQFAxKAlESgJQC5ROKNxUT1BDUUaN6jQaoKIFRAogVRKCiBUQKMFBICnBUYKeUEkogVGCnBQSSnlACnlUHKeUEpwUE1LfeP8rJqXDKb+x/FtrPijUNWmw6qre2xFd7j3mODXOnYOjfVebzydV6vx87JZ+ydVgFxbAHrI6Fc7i1wXEnYDhxIn8j91vVKxdqBLQOZ3Hn0K568qF+dzSA5neI2dAAnRY8c7b8mXTFp0nOuGtDvAM3HjsB6cUFnmNUNBIMkEz0qTPLh7q3eOmlSu2DUOymOUgR13B91VAiuHicuro11zA6de8T7L0PMGxc5uZhfJa8xvH77y3bO7LWwdZkZtyOJ0WHTGS2FRze9UqH0JcT9ir9CoWvyTuO97Rp9VnKbbwumpfVnAAt1HlOvmpvhhxqPLy0DIDPUmAPzVVlQN0cYHnotf4ZDQKrW+Luu/4nRc8Z3HbLK8a100pIZXpeI8oSUiUJKKclCUxKYlAiUJKRKElAiUBKRKElAiVGSnJQEohnFRPKNxUTyoqJ5UconlRyg0wUQKiAPJGGnkrqokBRAqKCnzJoTSnlQhycORU0ogVEJ5Iww8ldVOhgopUeU8kk0qUFOCogiBUF7DaWao0dZPkNVWxiq6pWNKlAaO9UcePIK9h7+za55nwlcZjl5VIy0iWmq7VwmS0D7SV5/L/Vlp38fWO25XxGhRZD3S7QQ2CSToIA24brkquI0mVQXMqNLs2vdOZuodLRoR+id9pTFF1IyHOg9pEkOadM0cJVK4bUdlc6gS5oIa9hDmny158+aYSGdy+o3W4e0WoFJ2akST5Ak/UAn2Cz+z7+mh0GwnTbT0+iXwrfubUqUKvda4HK3+kjf8irBgVs/AHb6JNy2Vq9yWDurVgoMfVOVrH5gI8W+XTidtOayKN/TL3PZSd3dHEuAcfTh7qX4huHVK9OlRhwY2IOgkj6HRQNsHie1cym18Zgwl1R4HADgtYa1/UxlvfUajr6lUDcsgkA5XeIT66rQ+HanZ18rzuCwHodvyWNcW3bCW08rWCGGdRGw6qTBa7i6nn8QIHnBWfrpt29QQSEEo6skzG6iK9HbzEShJSJTQgRKElOWoCoEShJQkoC5ARKAlMSgJQESgJTFyAlA7ionFOSo3II3lBKdwQwg60WwRttVpNtlPTtui+pMcXi3WMbPogdYDkujFqgdbBS4405ZOe+SHJE2y6La7EckbKCnDFeWTKp2amFn0Ws2iEYpBWSJ2xTZ9EJsui3OySFBNYr2wvk+iJtmt0UEz2wCdPYLGUjU24z4krQ3s2Eg76fvZYLLYupurV64AjKI0yD+2eK1vimo5pl05ekDQ8yuYt6Aa7WIPhLu8OkA6Svi273X1ZNaibtA9uRjnvaNi6k4xO4D2EGPQqBlrUY6WEt5wCM3/ErpLFhENqVKfMADX1yq5i9gXtY5riIMwKVTv67ErMz+luLjaNB4qmplh7zlbO4B0J6Ko+5IJ3OvI6rtKeFdsyDna9plrwHMg8CJJJ9VztTCqub5WT22/aQIyZvFPPLpzn3XTHLZcZPtnWtIueKjR3hIPlsPbVWW2T9XAFzjxiSJ5x6roH4OKDQGkl5Pec5rnZp3mE2GW2Vpl7jPAsc0CeEumVOacHPl7ZFN+bPoWuLgNeWVugRWlR7KzQW93PmHHfcLTxCxLtXQAPCQ0TI210VPDM767czgdeRadOhCsu4zlNPRaduC0Homdajkgt78DR2inN6F3nnscb4pUHyzUvlwp+2aUD3hX/1T9J6P5QutggNnKN1YDiky5HNax/IwvzGb4Mp8VWqYf0UX8PW1QrAqwKAK9Uwwvcee5ZTpzZskBsV1PyY5KKpbhX14pyyc18ghNoF0DrdQVLNOEXlWA6gOSA2/RdE2wRGwHJT1xebmPlDyS+SK6X5BL5JanijFzromW6RoqJt6m+alcfc7etKKZTi2JR0ay0aBBV9tPXGc2z6IjbLZbTCc0Ap7KvCMX5dMbZaz6Crvtyp7acIqMoKYW6NtMhShPbThFR1sqeIUsrCStfMqGMiaTgs5eW6q44Tbkb4MrMggxHLfyndca+m9ktNMCmNTUJHcHAuedvIQtijiWSo5lXwtO/MnZo+qvYjasqtaKmjd202ySTzMa/n5L58/l7XMWLw056by9gOtRxdkaeQHie7UaeS6uwv6dQZHOMecGRvMHqNOE666DksYoPBAYQGNmXAaU28Q1vPhm3JMCAdYaF8GkNiADlOs5Q3Ut+sHmXO6LWpe03ft3ws3NHcDSD6e+5WKcGqiv2ufhGXLoR91RsMZrgS10jkdjr/AJV5/wAS1eNNs89VOovdaL7clv8AMAaBxmZ/RY+JYqxgyN211318t/36KleYjVqRmcY4jgP3Cx769bqI7x9zr9Dx/wC0mO6u9RLUv3DU1SWnYeIO99D5EeiO3vWth7+5waB4fNzNh6LOotyS957vFp2dxBH70T0qRrPB/B5bDkV0kjnbt1V9euytiYImfwn22VJuMuYcrlLTrBzMgLcrRAmYKwMZrukU9Mo2iFMZvpLXSDGgditC2xAO4rzYXLm8Vq2OJQJlMvF+lmbsrytpoVn0b05olZlPFwdyqvzcvBapMC5O2sXOJXRWTnDdYGBhzgCQt91wAIKvj82WCZ+OZNSm9pUdWkFmucQJBUtteZhqV68fyJk898NiyKKXy6ancDmp21JXaZudxA23TOoK0AgeVvmzwU6lOFRfU1V67qABc1dXXe3XLLzaWePbumYe1P8Aw4clm08RqDdqs08X5gryco9XFK+yhA0Oaj/ijUhesKvM4pWXhG6kGJhVyWlRm3aU5nFfF+08UQuQeKzDZN5oTaRs4pyppriqFIIKwewfwcrVEVAkyTTV7EKniFv3D5IReOG4UV1iQLSFdw04bFrBj4eB3mScswC4fn14cNdRxd5f3FJ5fm/mO020YwaGBwk7dB1XV4lnDjVpumnLs7eccjzVTtqNwIIAqcRxbyE+y81unaTbmDjLmUwaglzjpwjXTTpv6tVGpctjNT00EjnIE/f6LoMVwjM4RBGjQeQaP2fVYd7gVQGQDpy9gtY3GlmQKF+3gXNceWxPErRbemNCD9Pdc+/Dqo4cDGkKWhb1wMp1HXaVu4xmZVpXleo4AM0G6ziWM1cZeqdSlWzENa4Tw5eSv4Zg89+qdBwKupIm7asYdbOrAcAJ7pJI/e607qq2mw0acdo76c1RuL8//XRERAngNFHbNDJc50v5nrylZ1vurv6jQs3tY2CA6NT085WZcOGYmIlS2dzq5zhM6RxTXlsRwIB2kQtz5ZqlcW8iWqgSWq/Sr5TlKsvtmuWts6Y9NzidF0OBW5zAuVehQa1XrKqQ6QsZ3pvDHt3tnfMpsjiqF3is6DdZIeTuonuIK8deqYxqtxV+3BT0sTgarFdW0UYrSt4sZRrU/iDK+CdF0mE4y1+xXlOKPIMhSYdiDqZDg4herHc7eW6vT2s3QjdZt3ijW7uC5q2xR1ZmjkNtg7qplzinu+l9bTvcWBboVy1e4JcTK6u3+GGcSSPNSHAaI0yBZ7vdNSfDoaNAnxCETrYLXdSVWpbN4mFV2yG2uu6t07UcwpPkATIefdKtZH8NRNQ2TrPkVC+xqDwvUVSyrfhqBJltc/6jfZT/AEHdRrjkVXruuBs0H1V3PcN3ylO7FXN8dI+mqaVStr2qPHTK0aeLt4ghDSxig7TY8jopKtuyoJaQpL+jSw2+puG4VO8NNzTETCr18PdGgWXWsXtkwQrciRg1qLjSd2ZnI4iP7eK5vKyoZJLH7k8SJ10PstX+IFhe1okF2WD+LhoFz+MXMO7oEjUkdOHvp6LOrtdxdd8xTdvnbHqAOPVGzGQTkILTwB022WIMecyCY0GvXXYIv4yx577RoQB00k/RT137jXOfVbjLppIA6nnEiB+Sgc50wAC3/sg/vksqkxh1Y4gSNJ66K9ZOcxxBM9ekx76LPHSzLawwy7YR9tJWXid0NQDptrsDyVt7jLg0LAvHNdo50Dl+q3hj2znl0D5ue6wQ3jPFJ9wfC3X0290xdSAgu/yip5nj+U0Nb/Ud11c9ioAMMvOvAcl0Xz5q0JdT0bpK5evQeNpcefBWsHdVcTT7NzpGgAMpZvtJfoTGgmCFbqUi0IX0C0wQWuB1B3CvPbLdVLW5GXb1JMLYt6UalUaFCDKuGquWddMIvhyaq5V6b0qlRcuDty0B1RA58bKF2ZxhoJPQE/ZWKWEXThpbv9RH3XSTTllko3VPMqN3o2FuO+Hrz/Qd7t/VUrvBrkeKg701+y6yuN7DgGJFgXV4f8UgQ2N1jYN8MHeqco5bFaN1hVtq1r++BzBj0XLLLG3puY5Sdu4tsSDmiCJUdVriZkrlfhzDqjDLn+S6kuKnPfS8XcB6FwB4KBqIOXfblo7rRp4QoTho4Eyp86cP6oM6vhDz4XlU6mDXA2qlb+Y/shEHdfsr0OYdhFz/AKqifaXbfxNPmCuoq1njZk+UIO1kSWH21WbFlcnUZUj+bbh3Vuv0Kgp6H+TUcx39D5/Ndh2M6gFp6hZl9htR27GPb7FY4tclW0+ISwhlw2P7uB9Vq3D6b2SCDIXN3trVYI7F72cWkEkf7XcVisv3UT3XE0jwMhzDygpuz5XUvwq4la0mMqPqOg9o7LEd1clVwztWnsg4sGsjjvAB2n9V09XB23FUVa5mhTEhs6FxM6q1a1mVAapA+XYYpsGziPxGOqnLSXH6cRS+GqhZmDSWggAATuAd+PBU6uFtaO8CNyTB4CD916eL+pVf2dNoaAMzieBI7oA5+ewhRXDG1AaVw1rp3jugdM0970SeXvs4ddPNW0A0yDAGymrX41P4tR5zv+quYzglSi8lgL6Z1BGseg2WFWcBoeP0XXUrG9L1nVIdIdOqyLymHVXRxMxyWjh1nUquik0kj29102EfCjWP7W4IJ3DAdzyJTlMTVrn8IwHOQdAOBd+/JbdWiygQ17Yb+FxgtfrpBT4rd3WaQ3JTGgDTlgdOBT2+ICo3JU1DtCCCAf8A1cOixbb21NRF2NOqQ1hyv5/hd6jY9EDWut3ZnVu9BgBrgQeQdEHzBVe/wl9OKlE5o4T3iBr6/fRXKhbc0THibOh8TSNweKs/4UFW8ZVE5iXcySSoHA8CsW3eW1Mp5wumsaZdo1uZ3ILVx0zM1SjSceCt2uEVKhhgJ+3uutwn4Xe6HVSAOQ1XUULalSEADT97BYrctcjh3wW9wHaPjoNSt61+Dbanq5hef7tf8LVfiMaNG39p+0Kq/EWOMOFQHmGmD76KdLdpexZTEU6TGjo1QfOh3dmD5KE3VEGS9w/4uB894+ilo3lvU/GJ5kQdfosjNucSqsdkcNOfMKhd31Qd7dp302XWUrdh1L2Pbwnh5K32bIgMaekAJIfDhjXc8hsTO0K9h3wbbMqdtVl1Q66nQei6htFs602iNogpVwOLZVxx0luxNtqUCGDQaKnXt2z4AiNUE9x09OIhSNJ4jVW6NVea88R9UZVGlcKYPWmVweaXqqubqiaTzQWjHP2QF/KUASlUTsfzKWcdT7lRQjDUDmr0QOru9ETzGypVnlXZpZNXr9VBc0mvEPa1w5OAP3QNq8AEYZzVmqMm+wKk9hY1rmAmTkdvHnP0WLd4NUptp06cPptdJnuRrIkcQP0XZEQq1WDopcYbYL6DadPLxc4uef6ukrDvL2lTfLW5nRrOseXJdTeWIeIBhYOJfC1RxzMcNOY39lwuF26yzTDpfEz8xaGgdNFl3NnRvKwNTuPO+XQOKLGcOqUXZ30yOBI1BWXYMrPqteaVQU2yQ4NOv0XTDHXwzlY7S0sG2rXsZDaYAJJ1c8rnMVunObnJI17vAqWh829+XKXMBMFxgkcJCa7wS8dUD3UwWDgDxWeF32TKa0VO7caZFTYDY8VDh3ZubnaNQdTM+kLU/wDitxVYQ5wZPqUrP4Iq0m5G1BE6mOCsx6S5TalfXIpgO4kiP19lNSFqSHue6m8g5oaHNIP9Wg+66i0+HKAAFRucj+rVHffD1CoAA3LHLRa49M8tuGb8OAuzU7mk5hIPeJY4ehkfVdpg9tQoNANVnUhwJd7cFm3fwkRqzvdNj9FQOEubo4PHqUttWYx1918UUmjLSBd12CwLn4hrOmH78AIhRW2HAfgJ9ynt8IqZiBTMcCovwnt8VqjvOeT67q7b/EDzvoVXqYDWOsADgJUBw9wgFqJXT2mNNcIdCmqUQ7Vhb5OAK5C4tntjI06brYwqs+ASpFmWmkaDm/8A4U56DdPQ7SdaDY9T+auNuUTLmTorell2moFw/CAPM/qpHVI6pqZnxQge8bBXTO0VVjScw0dzH581OWPOrCIUJCHtY2KzYu1Qh07qVlQxukkrIyOncFTC5SSWgTblTC4KZJUF8wVK24SSUqnfXUDjKSSINpDdSqlfEtYaEkkUzaxO5UbzySSUIFrjzVunU0TpKoq3QY7xAFKg2nsGhJJNgK9lTnNGqcU2kQEklpCbThG5nFOkiM+u4So8/IJJLLSekSjLw3xCfNJJSkObxoEhoU1tdzwASSTHsy6PXrKFrA7cJJLNWCqWojUKClQbsAkknxRaNIALMryzUJJLpZuMRJb3gduYVgObMgpJLE6aS9oeBQuakklpI//Z",
				"hudai/testImage"
			);
			const deleted = await firebase.deleteFileWithPrefix("hudai");
			assert.isNotNull(deleted);
			assert.equal(deleted, 1, "Image delete successful");
		} catch (err) {
			assert.fail(err);
		}
	});
});
