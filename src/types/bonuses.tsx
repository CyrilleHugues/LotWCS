import * as constants from '../constants/bonuses';

export interface IBonusDestiny {
  type: constants.BONUS_DESTINY;
  value: number;
}

export interface IBonusEntanglement {
  type: constants.BONUS_ENTANGLEMENT;
  value: number;
}

export interface IBonusStartingChi {
  type: constants.BONUS_STARTING_CHI;
  value: number;
}

export interface IBonusOneAmongN {
  type: constants.BONUS_ONE_AMONG_N;
  bonuses: IBonus[];
}

export interface IBonusSkillRank {
  type: constants.BONUS_SKILL_RANK;
  skill: string;
}

export interface IBonusSpeciality {
  type: constants.BONUS_SPECIALITY;
  skill: string;
  speciality: string;
}

export type IBonus =
  IBonusDestiny
  | IBonusEntanglement
  | IBonusStartingChi
  | IBonusOneAmongN
  | IBonusSkillRank
  | IBonusSpeciality
;

/* tslint:disable:no-any */
export function isBonus(bonus: any): boolean {
  switch (bonus.type) {
    case constants.BONUS_DESTINY:
    case constants.BONUS_ENTANGLEMENT:
    case constants.BONUS_STARTING_CHI:
    case constants.BONUS_ONE_AMONG_N:
    case constants.BONUS_SKILL_RANK:
    case constants.BONUS_SPECIALITY:
      return true;
    case constants.BONUS_REDUCTION:
    default:
      return false;
  }
}
