export enum UserType {
	Manage = 'Manage',
	Caddie = 'Caddie',
}
export enum mapAssetObjectType {
	Block = 'block',
	Image = 'image',
	Label = 'label',
	Circle = 'circle',
}
export enum sideGames {
	SKIN = 'Skin',
	MATCH_PLAY = 'MatchPlay',
	STROKE_PLAY = 'StrokePlay',
	NASSAU = 'Nassau',
	STABLEFORD = 'Stableford',
	MODIFIED_STABLEFORD = 'ModStableford',
	BIRDIES = 'Birdies',
	EAGLES = 'Eagles',
	PARS = 'Pars',
	SIXES = 'Sixes',
	LAS_VEGAS = 'LasVegas',
	HESSEIN = 'Hessein',
}
export enum sideGamesTW {
	SKIN = '逐洞賽',
	MATCH_PLAY = '比洞賽',
	STROKE_PLAY = '比桿賽',
	NASSAU = '拿騷',
	STABLEFORD = '史特伯福分',
	MODIFIED_STABLEFORD = '改良史特伯福',
	BIRDIES = '小鳥',
	EAGLES = '老鷹',
	PARS = '標準桿',
	SIXES = '六局比桿賽',
	LAS_VEGAS = '拉斯維加斯',
	HESSEIN = '打海珊',
}
export enum ReportType {
	URL = 'URL',
	JSON = 'JSON',
}
export enum HcpType {
	NoHcp = 'NoHcp',
  FullHcp = 'FullHcp',
  HcpDiff = 'HcpDiff',
	Handicap = 'Handicap',
}
export enum sideGameGroup {
	NONE = '',
	A = 'A',
	B = 'B',
}
export enum sideGameFormat {
	individual = 'individual',
	betterball = 'better ball', 
	team = 'team',
}

export enum scoreZone {
	front = 'front',
	back = 'back',
}