module.exports = {
    "attack": {},
    "defense": {
        "normal": {
            "0": ["ghost"],
            "50": [],
            "200": ["fighting"]
        },
        "fire": {
            "0": [],
            "50": ["fire", "grass", "ice", "bug", "steel", "fairy"],
            "200": ["water", "rock", "ground"]
        },
        "water": {
            "0": [],
            "50": ["fire", "water", "ice", "steel"],
            "200": ["electric", "grass"]
        },
        "electric": {
            "0": [],
            "50": ["electric", "flying", "steel"],
            "200": ["ground"]
        },
        "grass": {
            "0": [],
            "50": ["water", "electric", "grass", "ground"],
            "200": ["fire", "ice", "poison", "flying", "bug"]
        },
        "ice": {
            "0": [],
            "50": ["ice"],
            "200": ["fire", "fighting", "rock", "steel"]
        },
        "fighting": {
            "0": [],
            "50": ["bug", "dark", "rock"],
            "200": ["flying", "psychic", "fairy"]
        },
        "poison": {
            "0": [],
            "50": ["grass", "fighting", "poison", "bug", "fairy"],
            "200": ["ground", "psychic"]
        },
        "ground": {
            "0": ["electric"],
            "50": ["poison", "rock"],
            "200": ["water", "grass", "ice"]
        },
        "flying": {
            "0": ["ground"],
            "50": ["grass", "fighting", "bug"],
            "200": ["electric", "ice", "rock"]
        },
        "psychic": {
            "0": [],
            "50": ["fighting", "psychic"],
            "200": ["bug", "ghost", "dark"]
        },
        "bug": {
            "0": [],
            "50": ["grass", "fighting", "ground"],
            "200": ["fire", "flying", "rock"]
        },
        "rock": {
            "0": [],
            "50": ["normal", "fire", "poison", "flying"],
            "200": ["water", "grass", "fighting", "ground", "steel"]
        },
        "ghost": {
            "0": ["normal", "fighting"],
            "50": ["poison", "bug"],
            "200": ["ghost", "dark"]
        },
        "dragon": {
            "0": [],
            "50": ["fire", "water", "electric", "grass"],
            "200": ["ice", "dragon", "fairy"]
        },
        "dark": {
            "0": ["psychic"],
            "50": ["ghost", "dark"],
            "200": ["fighting", "bug", "fairy"]
        },
        "steel": {
            "0": ["poison"],
            "50": ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"],
            "200": ["fire", "fighting", "ground"]
        },
        "fairy": {
            "0": ["dragon"],
            "50": ["fighting", "bug", "dark"],
            "200": ["poison", "steel"]
        }
    }
};
